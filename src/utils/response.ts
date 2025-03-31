export const successResponse = (data: any, message = "Success") => {
    return { success: true, message, data };
};

export const errorResponse = (message = "Something went wrong", status = 500) => {
    return { success: false, message, status };
};
