export const validationUserName = (userName: string) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{4,16}$/
    if (userName.trim() ==="") {
        return "Tên đăng nhập không được bỏ trống!";
    } else if (usernameRegex.test(userName)) {
        return "Tên đăng nhập sai định dạng";
    } else {
        return null;
    }
};

export const validationEmail = (email: string) => {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (email.trim() === "") {
        return "Email không được bỏ trống!";
    } else if (!regex.test(email)) {
        return "Email sai định dạng";
    } else {
        return null;
    }
};

export const validationPassword = (password: string) => {
    if (password.trim() === "") {
        return "Mật khẩu không được bỏ trống!";
    } else if (password.length < 6) {
        return "Mật khẩu phải có từ 6 kí tự trở lên";
    } else if (!/[A-Z]/.test(password)) {
        return "Chữ cái đầu của mật khẩu phải viết hoa!";
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt";
    } else {
        return null;
    }
};

export const validationRePassword = (password: string, rePassword: string) => {
    if (password.trim() !== rePassword.trim()) {
        return "Mật khẩu không khớp";
    } else {
        return null;
    }
};


