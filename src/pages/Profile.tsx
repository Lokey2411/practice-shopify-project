import React from 'react';

const Profile = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="bg-white rounded-xl shadow p-6 w-full md:w-1/3 flex flex-col items-center">
                    <div className="mb-6">
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 mb-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="avatar" className="w-20 h-20 rounded-full" />
                        </div>
                        <div className="text-center">
                            <span className="block text-gray-700 font-semibold mb-1">Thành viên Bạc</span>
                            <span className="text-xs text-gray-500">F-Point tích lũy 0</span>
                            <div className="text-xs text-gray-400 mt-1">Thêm <span className="font-bold text-blue-600">30.000</span> để nâng hạng Vàng</div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="font-bold text-red-600 mb-2">Thông tin tài khoản</div>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li className="font-semibold text-black">Hồ sơ cá nhân</li>
                            <li>Số địa chỉ</li>
                            <li>Đổi mật khẩu</li>
                            <li>Thông tin xuất hóa đơn GTGT</li>
                            <li>Ưu đãi thành viên</li>
                            <li>Đơn hàng của tôi</li>
                        </ul>
                    </div>
                </div>
                {/* Profile Form */}
                <div className="bg-white rounded-xl shadow p-8 flex-1">
                    <h1 className="text-2xl font-bold mb-8">Hồ sơ cá nhân</h1>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Họ */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                Họ <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập họ"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        {/* Tên */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                Tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập tên"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        {/* Số điện thoại */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Số điện thoại</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value="0394338212"
                                    className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                                    readOnly
                                />
                                <button type="button" className="text-blue-600 font-medium">Thay đổi</button>
                            </div>
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Email</label>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Chưa có email"
                                    className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                                    readOnly
                                />
                                <button type="button" className="text-blue-600 font-medium">Thêm mới</button>
                            </div>
                        </div>
                        {/* Giới tính */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                Giới tính <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-1">
                                    <input type="radio" name="gender" className="accent-blue-600" />
                                    Nam
                                </label>
                                <label className="flex items-center gap-1">
                                    <input type="radio" name="gender" className="accent-pink-500" />
                                    Nữ
                                </label>
                            </div>
                        </div>
                        {/* Ngày sinh */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                Birthday <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="DD"
                                    maxLength={2}
                                    className="w-1/3 border rounded-lg px-4 py-2 text-center"
                                />
                                <input
                                    type="text"
                                    placeholder="MM"
                                    maxLength={2}
                                    className="w-1/3 border rounded-lg px-4 py-2 text-center"
                                />
                                <input
                                    type="text"
                                    placeholder="YYYY"
                                    maxLength={4}
                                    className="w-1/3 border rounded-lg px-4 py-2 text-center"
                                />
                            </div>
                        </div>
                        {/* Nút lưu */}
                        <div className="md:col-span-2 flex justify-center mt-6">
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;