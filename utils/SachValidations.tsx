export function validateTieuDe(TieuDe: string): boolean {
    return TieuDe.trim() !== '';
}

export function validateTacGia(TacGia: string): boolean {
    return TacGia.trim() !== '';
}

export function validateNam(Nam: string): boolean {
    return Nam.trim() !== '' && /^\d{4}$/.test(Nam);
}

export function validateMoTa(MoTa: string): boolean {
    return MoTa.trim() !== '';
}

export function validateTheLoai(TheLoai: string): boolean {
    return TheLoai.trim() !== '';
}

export function validateDangSach(DangSach: string): boolean {
    return DangSach.trim() !== '';
}
