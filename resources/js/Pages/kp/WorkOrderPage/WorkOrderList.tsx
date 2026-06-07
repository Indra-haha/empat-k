import React, { useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { OrdersCSProps, StatusHistory } from '@/Types/Orders';
import { WorkOrderProps } from '@/Types/WorkOrder';
import OrderModals from '@/Features/order/components/OrderModals';
import WorkOrderDetail from '@/Features/work-order/components/WorkOrderDetail';
import { AdminItemCard } from '@/Components/AdminItemCard';
export default function Page ({
    workOrders,
}: {
    workOrders: Partial<Record<StatusHistory, WorkOrderProps[]>>;
}) {
    console.log('Work Order Page rendered', workOrders);
     const workOrdersEntries = Object.entries(workOrders);
    
        const [selectedOrder, setSelectedOrder] = useState<{
            key: string; 
            value: OrdersCSProps[];
        } | null>(null);
    
        useEffect(() => {
            if (workOrdersEntries.length > 0 && !selectedOrder) {
                const firstEntry = workOrdersEntries[0];
                setSelectedOrder({
                    key: firstEntry[0],
                    value: firstEntry[1] as OrdersCSProps[],
                });
            }
        }, [workOrders]); 
    
        const [openDetailOrder, setopenDetailOrder] = useState<OrdersCSProps | null>(null);
        const [openDetailWorkOrder, setopenDetailWorkOrder] = useState<WorkOrderProps | null>(null);
        const [showModal, setShowModal] = useState(false);
    
        const handleCardClick = (order: OrdersCSProps | WorkOrderProps) => {
          console.log("Card clicked with order:", order); 
          if ((window as any).Auth?.user()?.role === "kp") {
            console.log("User role is KP, ignoring card click.");
            return;
          }
          if (order.status === "process" || order.status === "checking") {
            setopenDetailWorkOrder(order as WorkOrderProps); 
            setopenDetailOrder(null);
          } else {
            setopenDetailOrder(order);
            setopenDetailWorkOrder(null); 
          }
          setShowModal(true);
        };
    
        const renderActiveModal = () => {
            if (!showModal) return null;
    
            const currentStatus = openDetailWorkOrder?.status || openDetailOrder?.status; // 4. PERBAIKAN: Pastikan kita cek status yang benar untuk menentukan modal mana yang muncul
            console.log("Current Status for Modal:", currentStatus); // Debug: Lihat status pengerjaan yang akan menentukan modal mana yang muncul
    
            if (currentStatus === "process" || currentStatus === "checking") {
                console.log("Rendering WorkOrderDetail for order:", openDetailWorkOrder); // Debug: Lihat data yang akan dikirim ke modal
                return (
                    <WorkOrderDetail
                        selectedOrder={openDetailWorkOrder}
                        onClose={() => setShowModal(false)}
                    />
                );
            }
    
            if (!openDetailOrder) return null;
    
            return (
                <OrderModals
                    selectedOrder={openDetailOrder}
                    onClose={() => setShowModal(false)}
                />
            );
        }; 
    return (
        <AdminLayout className="p-4">
             <section className="p-6">
                            {/* Tab Menu */}
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                {workOrdersEntries.length > 0 ? (
                                    workOrdersEntries.map(([key, value]: any) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                // 3. PERBAIKAN: Pastikan state terupdate dengan key string yang baru
                                                setSelectedOrder({ key, value: value as OrdersCSProps[] });
                                                setopenDetailOrder(null);
                                            }}
                                            className={`px-4 py-2 rounded whitespace-nowrap transition ${
                                                selectedOrder?.key === key
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 hover:bg-gray-300"
                                            }`}
                                        >
                                            {key.replace("_", " ").toUpperCase()}
                                        </button>
                                    ))
                                ) : (
                                    <p>Tidak ada data order.</p>
                                )}
                            </div>
            
                            {/* List Cards */}
                            {selectedOrder &&
                            selectedOrder.value &&
                            selectedOrder.value.length > 0 ? (
                                selectedOrder.value.map((order, index) => (
                                    <AdminItemCard
                                        key={order.no || `order-${index}`}
                                        url_img={order.url_img_product}
                                        judul={order.name}
                                        tgl={order.ordered_by}
                                        keterangan={String(order.quantity)}
                                        status={order.status}
                                        status_bukti_tagihan={order.status_bukti}
                                        onClick={() => handleCardClick(order)} 
                                    />
                                ))
                            ) : (
                                <p>Tidak ada order untuk workplace ini.</p>
                            )}
            
                            {/* Render Modal Dinamis */}
                            {renderActiveModal()}
                        </section>
        </AdminLayout>
    );
}