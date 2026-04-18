
export interface SharedProps {
    auth: {
        user: any; 
    };
    flash: {
        success: string | null;
        error: string | null;
    };
    [key: string]: any; 
}