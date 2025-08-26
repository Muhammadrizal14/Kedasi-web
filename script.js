function tampilkanMenu(menu, prefix) {
    let formHtml = `
        <h2>Latihan Menulis - ${prefix}</h2>
        <label>Judul:</label><br>
        <input type="text" id="judul"><br><br>

        <label>Pernyataan Umum:</label><br>
        <textarea id="pernyataan" rows="4"></textarea><br><br>

        <label>Deretan Penjelas:</label><br>
        <textarea id="penjelas" rows="6"></textarea><br><br>

        <label>Interpretasi:</label><br>
        <textarea id="interpretasi" rows="4"></textarea><br><br>

        <button onclick="koreksiTeks('${prefix}')">Koreksi</button>
        <button onclick="simpanLatihan('${prefix}')">Simpan</button>
        <div id="feedback"></div>
    `;
    document.getElementById("konten").innerHTML = formHtml;
}

function simpanLatihan(prefix) {
    let judul = document.getElementById("judul").value;
    let pernyataan = document.getElementById("pernyataan").value;
    let penjelas = document.getElementById("penjelas").value;
    let interpretasi = document.getElementById("interpretasi").value;

    let isi = `Judul: ${judul}\n\nPernyataan Umum:\n${pernyataan}\n\nDeretan Penjelas:\n${penjelas}\n\nInterpretasi:\n${interpretasi}`;

    let blob = new Blob([isi], { type: "application/msword" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${prefix}_latihan.doc`;
    link.click();
}

// daftar kata kunci
const kataKunciTopik = {
    "gunung meletus": [
        "gunung", "meletus", "magma", "lava", "abu", "vulkanik", "gunung api",
        "letusan", "awan panas", "lahar", "krater", "gempa", "erupsi",
        "suhu panas", "ledakan", "asap", "batuan", "kawah", "material", "pijar"
    ],
    "gempa bumi": [
        "gempa", "bumi", "getaran", "seismograf", "tektonik", "vulkanik",
        "lempeng", "patahan", "tanah bergerak", "gelombang", "seismik",
        "kerusakan", "bangunan roboh", "tsunami", "retakan", "permukaan bumi"
    ],
    "bullying": [
        "bullying", "perundungan", "ejekan", "memukul", "mengolok", "menghina",
        "mengejek", "kekerasan", "fisik", "verbal", "mental", "psikis", "takut",
        "tidak percaya diri", "pelecehan", "dijauhi", "teman", "menindas"
    ]
};

function koreksiTeks(prefix) {
    let judul = document.getElementById("judul").value.trim();
    let pernyataan = document.getElementById("pernyataan").value.trim();
    let penjelas = document.getElementById("penjelas").value.trim();
    let interpretasi = document.getElementById("interpretasi").value.trim();

    let feedback = "";
    let poin = 0;
    let adaKesalahan = false;

    const kataKunci = kataKunciTopik[prefix.toLowerCase()] || [];

    // 1. Judul
    if (judul.length < 3) {
        feedback += "⚠️ Judul terlalu singkat atau belum ditulis.<br>";
        adaKesalahan = true;
    } else {
        feedback += "✅ Judul sudah diisi.<br>";
        poin++;
    }

    // 2. Pernyataan Umum
    if (pernyataan.length < 10) {
        feedback += "⚠️ <strong>Pernyataan Umum</strong> terlalu singkat.<br>";
        adaKesalahan = true;
    } else {
        if (pernyataan.includes("adalah") || pernyataan.includes("merupakan")) {
            feedback += "✅ <strong>Pernyataan Umum</strong> sudah menjelaskan pengertian.<br>";
            poin++;
        } else {
            feedback += `⚠️ <strong>Pernyataan Umum</strong> belum menunjukkan pengertian.<br>`;
            feedback += `💡 Sertakan kata seperti: <em>${kataKunci.join("</em>, <em>")}</em><br>`;
            adaKesalahan = true;
        }
    }

    // 3. Deretan Penjelas
    if (penjelas.length < 15) {
        feedback += "⚠️ <strong>Deretan Penjelas</strong> terlalu singkat.<br>";
        adaKesalahan = true;
    } else {
        const cocok = kataKunci.some(kata => penjelas.toLowerCase().includes(kata));
        if (cocok) {
            feedback += "✅ <strong>Deretan Penjelas</strong> sesuai dengan topik.<br>";
            poin++;
        } else {
            feedback += `⚠️ <strong>Deretan Penjelas</strong> belum menunjukkan topik <em>${prefix}</em> secara relevan.<br>`;
            feedback += `💡 Sertakan kata kunci seperti: <em>${kataKunci.join("</em>, <em>")}</em><br>`;
            adaKesalahan = true;
        }
    }

    // 4. Interpretasi
    if (interpretasi.length < 10) {
        feedback += "⚠️ <strong>Interpretasi</strong> terlalu singkat atau belum ditulis.<br>";
        adaKesalahan = true;
    } else {
        feedback += "✅ <strong>Interpretasi</strong> sudah ditulis.<br>";
        poin++;
    }

    // total
    feedback += `<br><strong>Skor:</strong> ${poin}/4<br>`;
    if (adaKesalahan) {
        feedback += "👉 Perbaiki bagian yang masih salah agar lebih baik.";
    } else {
        feedback += "🎉 Bagus! Teks eksplanasi kamu sudah lengkap dan sesuai.";
    }

    document.getElementById("feedback").innerHTML = feedback;
}
