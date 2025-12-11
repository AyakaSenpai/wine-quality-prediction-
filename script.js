// GANTI INI SETELAH API KAMU JADI!
const API_URL = "https://nama-kamu.onrender.com/predict";

document.getElementById("wineForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Sedang memproses...";
    resultDiv.className = "result";

    const data = {
        fixed_acidity: parseFloat(document.getElementById("fixed_acidity").value),
        volatile_acidity: parseFloat(document.getElementById("volatile_acidity").value),
        citric_acid: parseFloat(document.getElementById("citric_acid").value),
        residual_sugar: parseFloat(document.getElementById("residual_sugar").value),
        chlorides: parseFloat(document.getElementById("chlorides").value),
        free_sulfur_dioxide: parseFloat(document.getElementById("free_sulfur_dioxide").value),
        total_sulfur_dioxide: parseFloat(document.getElementById("total_sulfur_dioxide").value),
        density: parseFloat(document.getElementById("density").value),
        pH: parseFloat(document.getElementById("pH").value),
        sulphates: parseFloat(document.getElementById("sulphates").value),
        alcohol: parseFloat(document.getElementById("alcohol").value)
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `
                <h2>Prediksi Kualitas Wine</h2>
                <div class="quality">${result.predicted_quality}</div>
                <p>dari skala 1-10</p>
            `;
            resultDiv.className = "result success";
        } else {
            resultDiv.innerHTML = "Error: " + (result.detail || "Unknown error");
            resultDiv.className = "result error";
        }
    } catch (error) {
        resultDiv.innerHTML = "Tidak bisa terhubung ke server. Cek URL API!";
        resultDiv.className = "result error";
        console.error(error);
    }
});