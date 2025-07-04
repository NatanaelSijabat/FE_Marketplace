export function hitungHargaSebelumDiskon(hargaSetelahDiskon: number, diskonPersen: number) {
    return hargaSetelahDiskon / (1 - diskonPersen / 100);
}

export const formatDollar = (angka: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(angka);
}