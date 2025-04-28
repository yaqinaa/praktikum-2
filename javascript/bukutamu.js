const form = document.getElementById("formBukuTamu");
        const daftarHadir = document.getElementById("daftarHadir");

        function tampilkanDaftar() {
            const data = JSON.parse(localStorage.getItem("bukuTamu")) || [];
            daftarHadir.innerHTML = "";
        
            data.forEach((tamu, index) => {
                const item = document.createElement("div");
                item.classList.add("item"); // ganti jadi div biasa, kasih class item
            
                // Pembungkus untuk nama dan waktu
                const infoWrapper = document.createElement("div");
                infoWrapper.classList.add("info-wrapper");
            
                // Teks nama tamu
                const span = document.createElement("span");
                span.textContent = `${tamu.nama} - ${tamu.alamat}`;
                span.classList.add("nama-alamat");
            
                // Waktu hadir
                const waktuSpan = document.createElement("span");
                waktuSpan.textContent = `${tamu.waktu}`;
                waktuSpan.classList.add("waktu");
            
                if (tamu.selesai) {
                    span.classList.add("selesai");
                    item.classList.add("selesai");
                }
            
                infoWrapper.appendChild(span);
                infoWrapper.appendChild(waktuSpan);
            
                // Tombol selesai
                const selesaiButton = document.createElement("button");
                if (tamu.selesai) {
                    selesaiButton.innerHTML = '<i class="fas fa-undo"></i>'; // Ikon batal
                } else {
                    selesaiButton.innerHTML = '<i class="fas fa-check-circle"></i>'; // Ikon selesai
                }
                selesaiButton.addEventListener("click", () => tandaiSelesai(index));
            
                // Tombol hapus
                const hapusButton = document.createElement("button");
                hapusButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
                hapusButton.addEventListener("click", () => hapusData(index));
            
                // Bungkus tombol-tombol
                const buttonWrapper = document.createElement("div");
                buttonWrapper.classList.add("button-wrapper");
                buttonWrapper.appendChild(selesaiButton);
                buttonWrapper.appendChild(hapusButton);
            
                // Gabung semua ke item
                item.appendChild(infoWrapper);
                item.appendChild(buttonWrapper);
            
                // Masukkan item ke daftar hadir
                daftarHadir.appendChild(item);
            });
            
            
        }
        

        // Fungsi untuk menghapus data
        function hapusData(index) {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Data ini akan dihapus!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Ambil data dari localStorage
                    const data = JSON.parse(localStorage.getItem("bukuTamu")) || [];
                    // Hapus data berdasarkan index
                    data.splice(index, 1);
                    // Simpan kembali ke localStorage
                    localStorage.setItem("bukuTamu", JSON.stringify(data));
                    // Tampilkan ulang daftar setelah dihapus
                    tampilkanDaftar();
                    Swal.fire(
                        'Dihapus!',
                        'Data telah dihapus.',
                        'success'
                    );
                }
            });
        }

        // Fungsi untuk menandai sebagai selesai (mencoret nama)
        function tandaiSelesai(index) {
            // Ambil data dari localStorage
            const data = JSON.parse(localStorage.getItem("bukuTamu")) || [];
            // Jika tamu sudah selesai, batalkan status selesai
            if (data[index].selesai) {
                data[index].selesai = false;
                Swal.fire({
                    title: 'Status Dibatalkan!',
                    text: `${data[index].nama} telah dibatalkan sebagai selesai.`,
                    icon: 'info',
                    confirmButtonText: 'Tutup'
                });
            } else {
                // Jika tamu belum selesai, tandai sebagai selesai
                data[index].selesai = true;
                Swal.fire({
                    title: 'Status Selesai!',
                    text: `${data[index].nama} telah ditandai selesai.`,
                    icon: 'success',
                    confirmButtonText: 'Tutup'
                });
            }
            // Simpan kembali ke localStorage
            localStorage.setItem("bukuTamu", JSON.stringify(data));
            console.log(`Tamu ${index} telah ditandai selesai`);
            // Tampilkan ulang daftar setelah ditandai selesai
            tampilkanDaftar();
        }

        // Saat form dikirim
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Mencegah reload halaman
        
            // Ambil nilai input
            const nama = form.querySelector('[name="nama"]').value;
            const alamat = form.querySelector('[name="alamat"]').value;
        
            // Ambil waktu saat ini
            const waktuSubmit = new Date().toLocaleString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        
            // Ambil data sebelumnya
            const data = JSON.parse(localStorage.getItem("bukuTamu")) || [];
        
            // Tambahkan tamu baru dengan waktu submit
            data.push({ nama, alamat, selesai: false, waktu: waktuSubmit });
        
            // Simpan ke localStorage
            localStorage.setItem("bukuTamu", JSON.stringify(data));
        
            // Reset form
            form.reset();
        
            // Tampilkan ulang daftar
            tampilkanDaftar();
        
            // Tampilkan SweetAlert setelah form berhasil disubmit
            Swal.fire({
                title: 'Terima Kasih!',
                text: ` ${nama} Sudah mengisi daftar tamu `,
                icon: 'success',
                confirmButtonText: 'Tutup'
            });
        });
        

        // Tampilkan data saat pertama kali halaman dimuat
        window.addEventListener("load", tampilkanDaftar);