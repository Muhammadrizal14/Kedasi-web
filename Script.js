function tampilkanMenu(topik) {
    const konten = document.getElementById("konten");
    let judul = "";
    let idPrefix = "";
    let videoSrc = "";

    // Menentukan judul dan video berdasarkan topik
    switch (topik) {
        case 'gunung':
            judul = "Gunung Meletus";
            idPrefix = "gunung meletus";
            videoSrc = "gunung-meletus.mp4"; // video lokal Gunung Meletus
            break;
        case 'gempa':
            judul = "Gempa Bumi";
            idPrefix = "gempa";
            videoSrc = "gempa-bumi.mp4"; // video lokal Gempa Bumi
            break;
        case 'bullying':
            judul = "Bullying";
            idPrefix = "bullying";
            videoSrc = "bullying.mp4"; // video lokal Bullying
            break;
    }

    konten.innerHTML = `
        <h2>${judul}</h2>
        <video width="100%" height="auto" controls>
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        
        <form id="form_${idPrefix}">
            <label><strong>Judul Teks:</strong></label><br>
            <input type="text" id="${idPrefix}_judul" placeholder="Tulis judul teks..."><br><br>

            <label><strong>Pernyataan Umum:</strong></label><br>
            <textarea id="${idPrefix}_pernyataan" placeholder="Tulis pernyataan umum..."></textarea><br><br>

            <label><strong>Deretan Penjelas:</strong></label><br>
            <textarea id="${idPrefix}_penjelas" placeholder="Tulis penjelasan proses..."></textarea><br><br>

            <label><strong>Interpretasi / Kesimpulan:</strong></label><br>
            <textarea id="${idPrefix}_kesimpulan" placeholder="Tulis kesimpulan..."></textarea><br><br>

            <button type="button" onclick="simpanLatihan('${idPrefix}')">Simpan</button>
            <button type="button" onclick="koreksiTeks('${idPrefix}')">Koreksi</button>
            <button type="reset">Reset</button>
        </form>

        <div id="hasil_${idPrefix}" style="margin-top: 20px;"></div>
        <div id="feedback_${idPrefix}" style="margin-top: 10px;"></div>
    `;
}
function simpanLatihan(prefix) {
    const judul = document.getElementById(`${prefix}_judul`).value.trim();
    const pernyataan = document.getElementById(`${prefix}_pernyataan`).value.trim();
    const penjelas = document.getElementById(`${prefix}_penjelas`).value.trim();
    const kesimpulan = document.getElementById(`${prefix}_kesimpulan`).value.trim();

    if (!judul || !pernyataan || !penjelas || !kesimpulan) {
        alert("Silakan lengkapi semua bagian sebelum menyimpan dokumen.");
        return;
    }

    const isiDoc = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Dokumen KEDASI</title></head>
        <body>
            <h2 style="text-align: center;">${judul}</h2>
            <p><strong>Pernyataan Umum:</strong><br>${pernyataan}</p>
            <p><strong>Deretan Penjelas:</strong><br>${penjelas}</p>
            <p><strong>Interpretasi / Kesimpulan:</strong><br>${kesimpulan}</p>
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', isiDoc], {
        type: 'application/msword'
    });

    const namaFile = `${prefix}_latihan.doc`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = namaFile;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function koreksiTeks(prefix) {
    const judul = document.getElementById(`${prefix}_judul`).value.trim();
    const pernyataan = document.getElementById(`${prefix}_pernyataan`).value.trim();
    const penjelas = document.getElementById(`${prefix}_penjelas`).value.trim();
    const kesimpulan = document.getElementById(`${prefix}_kesimpulan`).value.trim();

    let feedback = "";

    // ======== 1. JUDUL ========
    if (judul === "") {
        feedback += "❌ <strong>Judul</strong> belum diisi.<br>";
    } else if (!judul.toLowerCase().includes(prefix)) {
        feedback += `⚠️ <strong>Judul</strong> belum menyebutkan topik dengan jelas. Pastikan judul mengandung kata "<em>${prefix}</em>".<br>`;
    } else {
        feedback += "✅ <strong>Judul</strong> sudah sesuai dengan topik.<br>";
    }

    // ======== 2. PERNYATAAN UMUM ========
    if (pernyataan === "") {
        feedback += "❌ <strong>Pernyataan Umum</strong> belum diisi.<br>";
    } else if (!/(adalah|merupakan|ialah|yakni|disebut sebagai)/i.test(pernyataan)) {
        feedback += `⚠️ <strong>Pernyataan Umum</strong> sebaiknya mengandung kata kunci seperti <em>adalah</em>, <em>merupakan</em>, atau sejenisnya.<br>`;
    } else {
        feedback += "✅ <strong>Pernyataan Umum</strong> sudah memuat definisi.<br>";
    }

    // ======== 3. DERETAN PENJELAS ========
    if (penjelas === "") {
        feedback += "❌ <strong>Deretan Penjelas</strong> belum diisi.<br>";
    } else if (!/(karena|sehingga|akibatnya|pertama|kemudian|selanjutnya|akhirnya)/i.test(penjelas)) {
        feedback += `⚠️ <strong>Deretan Penjelas</strong> belum menjelaskan proses atau sebab-akibat dengan jelas.<br>`;
        feedback += `💡 Gunakan kata seperti <em>karena</em>, <em>sehingga</em>, <em>kemudian</em>, atau <em>akibatnya</em> untuk menjelaskan urutan atau sebab-akibat.<br>`;
    } else {
        feedback += "✅ <strong>Deretan Penjelas</strong> sudah menjelaskan proses secara logis.<br>";
    }

    // ======== 4. INTERPRETASI / KESIMPULAN ========
    if (kesimpulan === "") {
        feedback += "❌ <strong>Interpretasi</strong> belum diisi.<br>";
    } else if (!/(dengan demikian|kesimpulannya|oleh karena itu|dapat disimpulkan|hal ini menunjukkan|maka dapat dikatakan|penting bagi kita)/i.test(kesimpulan)) {
        feedback += `⚠️ <strong>Interpretasi</strong> belum mengandung kata simpulan atau penegasan.<br>`;
        feedback += `💡 Gunakan kata seperti <em>dengan demikian</em>, <em>kesimpulannya</em>, <em>oleh karena itu</em>, atau <em>maka dapat dikatakan</em> untuk memperjelas simpulanmu.<br>`;
    } else {
        feedback += "✅ <strong>Interpretasi</strong> sudah menyimpulkan dengan baik.<br>";
    }

    // Tampilkan hasil
    document.getElementById(`feedback_${prefix}`).innerHTML = `<div class="feedback-box">${feedback}</div>`;
}
