function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

const getFileData = () => {
    return new Promise((resolve, reject) => {
        readTextFile("./TokenFarmers.json", function (text) {
            var data = JSON.parse(text);
            resolve(data);
        });
    });
};

(function main() {
    getFileData().then((data) => {
        const input = document.getElementById("search_field");
        const btn = document.getElementById("search_btn");
        btn.onclick = function () {
            if (!data[input.value]) {
                alert("Your account/input is not present in the farmers list.");
            } else {
                alert("Your account/input is tagged as a farmer/bot account");
            }
        };
    });
})();
