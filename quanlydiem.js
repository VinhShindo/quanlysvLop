var soureAPI = 'http://localhost:3000/Students';
var soureAPIs = 'http://localhost:3000/Subject';

const listgruop = document.querySelector("#groups");
const formChange = document.querySelector('.form-change');
const cover = document.getElementById('cover');
const saveButton = document.getElementById('save')
const cancelButon = document.getElementById('cancel');

function start() {
    fetchDataFromAPI(renderData);
}
start();

function renderData(lists) {
    const arrName = [];
    const arrAverage = new Array(4);
    const arrPL = new Array(4);
    var i = parseInt(document.getElementById('status-down').value);

    lists[1].forEach((li, index) => {
        arrName[index] = li.name;
    });
    let htmlArr = [];

    for (let j = 0; j < 12; j++) {
        htmlArr.push(`<option value="${arrName[j]}">${arrName[j]}</option>`);
    }
    document.getElementById("status-downs").innerHTML += htmlArr.join('');

    var htmls = lists[0].map(function (list, index) {
        arrAverage[0] = (((parseFloat(list.Score[i].sub1[0])) + (parseFloat(list.Score[i].sub1[1])) + (parseFloat(list.Score[i].sub1[2]))) / 3) * 0.4 + (parseFloat(list.Score[i].sub1[3])) * 0.6
        arrAverage[1] = (((parseFloat(list.Score[i].sub2[0])) + (parseFloat(list.Score[i].sub2[1])) + (parseFloat(list.Score[i].sub2[2]))) / 3) * 0.4 + (parseFloat(list.Score[i].sub2[3])) * 0.6
        arrAverage[2] = (((parseFloat(list.Score[i].sub3[0])) + (parseFloat(list.Score[i].sub3[1])) + (parseFloat(list.Score[i].sub3[2]))) / 3) * 0.4 + (parseFloat(list.Score[i].sub3[3])) * 0.6
        arrAverage[3] = (((parseFloat(list.Score[i].sub4[0])) + (parseFloat(list.Score[i].sub4[1])) + (parseFloat(list.Score[i].sub4[2]))) / 3) * 0.4 + (parseFloat(list.Score[i].sub4[3])) * 0.6

        for (let j = 0; j < 4; j++) {
            let decimal = arrAverage[j] - Math.floor(arrAverage[j]);
            if (decimal < 0.3) {
                arrAverage[j] = Math.floor(arrAverage[j]);
            } else if (decimal > 0.7) {
                arrAverage[j] = Math.ceil(arrAverage[j]);
            } else {
                arrAverage[j] = Math.floor(arrAverage[j]) + 0.5;
            }
        }

        for (let j = 0; j < 4; j++) {
            if (arrAverage[j] >= 9 && arrAverage[j] <= 10) {
                arrPL[j] = "A+";
            } else if (arrAverage[j] >= 8.5 && arrAverage[j] < 9) {
                arrPL[j] = "A";
            } else if (arrAverage[j] >= 8 && arrAverage[j] < 8.5) {
                arrPL[j] = "B+";
            } else if (arrAverage[j] >= 7 && arrAverage[j] < 8) {
                arrPL[j] = "B";
            } else if (arrAverage[j] >= 7 && arrAverage[j] < 8) {
                arrPL[j] = "B";
            } else if (arrAverage[j] >= 6.5 && arrAverage[j] < 7) {
                arrPL[j] = "C+";
            } else if (arrAverage[j] >= 5.5 && arrAverage[j] < 6.5) {
                arrPL[j] = "C";
            } else if (arrAverage[j] >= 5 && arrAverage[j] < 5.5) {
                arrPL[j] = "D";
            } else {
                arrPL[j] = "F";
            }
        }

        return `
            <tr>
                <td rowspan="4">${index + 1}</td>
                <td rowspan="4">${list.id}</td>
                <td rowspan="4" id="name">${list.name}</td>
                <td class="subject">${arrName[4 * i]}</td>
                <td>${list.Score[i].sub1[0]}</td>
                <td>${list.Score[i].sub1[1]}</td>
                <td>${list.Score[i].sub1[2]}</td>
                <td>${list.Score[i].sub1[3]}</td>
                <td>${arrAverage[0]}</td>
                <td>${arrPL[0]}</td>
                <td rowspan="4"><button id="buttonS" class="bn3637 bn37" onclick="handdleChangeMember(${list.id})">Sửa</button></td>
            </tr>
            <tr>
                <td class="subject">${arrName[4 * i + 1]}</td>
                <td>${list.Score[i].sub2[0]}</td>
                <td>${list.Score[i].sub2[1]}</td>
                <td>${list.Score[i].sub2[2]}</td>
                <td>${list.Score[i].sub2[3]}</td>
                <td>${arrAverage[1]}</td>
                <td>${arrPL[1]}</td>
            </tr>
            <tr>
                <td class="subject">${arrName[4 * i + 2]}</td>
                <td>${list.Score[i].sub3[0]}</td>
                <td>${list.Score[i].sub3[1]}</td>
                <td>${list.Score[i].sub3[2]}</td>
                <td>${list.Score[i].sub3[3]}</td>
                <td>${arrAverage[2]}</td>
                <td>${arrPL[2]}</td>
            </tr>
            <tr>
                <td class="subject">${arrName[4 * i + 3]}</td>
                <td>${list.Score[i].sub4[0]}</td>
                <td>${list.Score[i].sub4[1]}</td>
                <td>${list.Score[i].sub4[2]}</td>
                <td>${list.Score[i].sub4[3]}</td>
                <td>${arrAverage[3]}</td>
                <td>${arrPL[3]}</td>
            </tr>
            `;
    })
    listgruop.innerHTML = htmls.join('');
}

function getData() {
    return fetch(soureAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.sort((a, b) => a.id - b.id);
            return data;
        });
}

function getDatas() {
    return fetch(soureAPIs)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data;
        });
}

function fetchDataFromAPI(callback) {
    Promise.all([getData(), getDatas()])
        .then(function (values) {
            const combine = [values[0], values[1]];
            callback(combine);
        });
}

function changeMember(id, data, callback) {
    fetch(soureAPI + `/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json()
    }).then(callback)
}
function handdleChangeMember(id) {
    $(".form-change").fadeIn(300);
    $("#cover").css('position', 'fixed');
    fetch(soureAPI + `/${id}`)
        .then(function (response) {
            return response.json()
        }).then(function (soure) {
            var i = parseInt(document.getElementById('status-down').value);
            var msv = document.getElementById('msv-input');
            var name = document.getElementById('name-input');
            var arrName = [];

            fetch(soureAPIs)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    data.forEach(function (item, index) {
                        arrName[index] = item.name;
                    });
                    document.querySelector('#nameSubject-' + 1).innerText = `Học phần: ${arrName[4 * i]}`;
                    document.querySelector('#nameSubject-' + 2).innerText = `Học phần: ${arrName[4 * i + 1]}`;
                    document.querySelector('#nameSubject-' + 3).innerText = `Học phần: ${arrName[4 * i + 2]}`;
                    document.querySelector('#nameSubject-' + 4).innerText = `Học phần: ${arrName[4 * i + 3]}`;
                });

            var arrPoint = new Array(16);
            var index = 0;
            soure.Score[i].sub1.map((value) => {
                arrPoint[index] = value;
                index++;
            })
            soure.Score[i].sub2.map((value) => {
                arrPoint[index] = value;
                index++;
            })
            soure.Score[i].sub3.map((value) => {
                arrPoint[index] = value;
                index++;
            })
            soure.Score[i].sub4.map((value) => {
                arrPoint[index] = value;
                index++;
            })
            msv.value = soure.id;
            name.value = soure.name;
            for (var j = 0; j < arrPoint.length; j++) {
                var point = document.getElementById('sub-' + Math.ceil((j + 1) / 4) + '-' + ((j % 4) + 1));
                point.value = arrPoint[j];
            }
            saveButton.onclick = function () {
                if (!!isNaN(msv.value)) {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Mã sinh không được chứa kí tự chữ', 5000);
                    return;
                }
                if (msv.value.trim() === '') {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Mã sinh không được để trống', 5000);
                    return;
                }
                if (name.value.trim() === '') {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Họ tên không được để trống', 5000);
                    return;
                }
                var s = true;
                for (var j = 0; j < arrPoint.length; j++) {
                    var point = document.getElementById('sub-' + Math.ceil((j + 1) / 4) + '-' + ((j % 4) + 1));
                    if (point.value > 10 || point.value < 0) {
                        s = false;
                        break;
                    } else if (point.value == "") {
                        continue;
                    }

                }
                if (s == false) {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Điểm nhập vào không hợp lệ, hãy nhập lại', 5000);
                    return;
                }
                for (var j = 0; j < arrPoint.length; j++) {
                    var point = document.getElementById('sub-' + Math.ceil((j + 1) / 4) + '-' + ((j % 4) + 1));
                    arrPoint[j] = point.value;
                }

                var formData = {
                    id: msv.value,
                    name: name.value,
                    gender: soure.gender,
                    date: soure.date,
                    email: soure.email,
                    datein: soure.datein,
                    status: soure.status,
                    Score: []
                };

                for (var term = 0; term < 3; term++) {
                    var termData = {
                        term: (term + 1).toString(),
                        sub1: [],
                        sub2: [],
                        sub3: [],
                        sub4: []
                    };


                    for (var j = 0; j < 4; j++) {
                        if (term != i) {
                            termData.sub1.push(soure.Score[term].sub1[j]);
                            termData.sub2.push(soure.Score[term].sub2[j]);
                            termData.sub3.push(soure.Score[term].sub3[j]);
                            termData.sub4.push(soure.Score[term].sub4[j]);
                        } else {
                            termData.sub1.push(arrPoint[j]);
                            termData.sub2.push(arrPoint[4 + j]);
                            termData.sub3.push(arrPoint[8 + j]);
                            termData.sub4.push(arrPoint[12 + j]);
                        }
                    }

                    formData.Score.push(termData);
                }
                changeMember(id, formData, function () {
                    fetchDataFromAPI(renderData);
                    $(".form-change").fadeOut(200);
                    $("#cover").css('position', 'relative');
                    pushAlert('<i class="fa-solid fa-circle-check"></i>', 'Thành công', 'Thay đổi điểm thành công', 5000);
                })
            };
        })
}

$(document).ready(function () {
    $("#cancel").click(function () {
        $(".form-change").fadeOut(200);
        $("#cover").css('position', 'relative');
    })
    $("#cancelS").click(function () {
        $(".change-point").fadeOut(200);
        $("#cover").css('position', 'relative');
    })
    $(".fa-bars").click(function () {
        $("span.hide-text").toggle("slow")
    });
});
function pushAlert(i, text, mess, time) {
    $('body').append(
        `<div class="animate__animated animate__bounceInLeft alert alert-info init-alert alert-dismissible m-b-0 fixed-alert">
            <button type="button" class="close close-fixed-alert" aria-label="Close">
                <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
            </button>
            <div class="alert-right-content">
                <p>${i} ${text}</p>
                ${mess}
            </div>
        </div>`
    );
    setTimeout(function () {
        $('.fixed-alert').removeClass('animate__bounceInLeft').addClass('animate__bounceOutLeft');
        $('.fixed-alert').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).remove();
        });
    }, time);
    $('.close-fixed-alert').click(function () {
        $('.fixed-alert').removeClass('animate__bounceInLeft').addClass('animate__bounceOutLeft');
        $('.fixed-alert').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).remove();
        });
    });
}

function handleMemberData(data) {
    var valueSearchInput = document.getElementById('search').value;
    var userSearch = data[0].filter(value => {
        return value.name.toUpperCase().includes(valueSearchInput.toUpperCase())
    })
    var combineData = [userSearch, data[1]];
    renderData(combineData);
}

function searchUser() {
    fetchDataFromAPI(handleMemberData);
}

function changeselectSubject(lists) {
    var nameSub = document.getElementById('status-downs').value;
    if (nameSub == "all") {
        fetchDataFromAPI(renderData);
        return;
    }
    var indexsub;

    lists[1].forEach((li, index) => {
        if (li.name.toUpperCase() == nameSub.toUpperCase()) {
            indexsub = index;
        }
    });

    var a = parseInt(indexsub / 4);
    var b = indexsub % 4 + 1;

    var htmls = lists[0].map(function (list, index) {
        var arr = [];
        for (let j = 0; j < 4; j++) {
            arr[j] = list.Score[a][`sub${b}`][j];
        }
        var Average = (((parseFloat(arr[0])) + (parseFloat(arr[1])) + (parseFloat(arr[2]))) / 3) * 0.4 + (parseFloat(arr[3])) * 0.6

        let decimal = Average - Math.floor(Average);
        if (decimal < 0.3) {
            Average = Math.floor(Average);
        } else if (decimal > 0.7) {
            Average = Math.ceil(Average);
        } else {
            Average = Math.floor(Average) + 0.5;
        }

        if (Average >= 9 && Average <= 10) {
            var PL = "A+";
        } else if (Average >= 8.5 && Average < 9) {
            var PL = "A";
        } else if (Average >= 8 && Average < 8.5) {
            var PL = "B+";
        } else if (Average >= 7 && Average < 8) {
            var PL = "B";
        } else if (Average >= 7 && Average < 8) {
            var PL = "B";
        } else if (Average >= 6.5 && Average < 7) {
            var PL = "C+";
        } else if (Average >= 5.5 && Average < 6.5) {
            var PL = "C";
        } else if (Average >= 5 && Average < 5.5) {
            var PL = "D";
        } else {
            var PL = "F";
        }

        return `
            <tr>
                <td>${index + 1}</td>
                <td>${list.id}</td>
                <td id="name">${list.name}</td>
                <td class="subject">${nameSub}</td>
                <td>${arr[0]}</td>
                <td>${arr[1]}</td>
                <td>${arr[2]}</td>
                <td>${arr[3]}</td>
                <td>${Average}</td>
                <td>${PL}</td>
                <td><button id="buttonS" class="bn3637 bn37" onclick="handdleChangePoint(${list.id}, ${indexsub})">Sửa</button></td>
            </tr>
            `;
    })
    listgruop.innerHTML = htmls.join('');
}

function selectSubject() {
    fetchDataFromAPI(changeselectSubject);
}

function handdleChangePoint(id, i) {
    $(".change-point").fadeIn(300);
    $("#cover").css('position', 'fixed');
    fetch(soureAPI + `/${id}`)
        .then(function (response) {
            return response.json()
        }).then(function (soure) {
            var msv = document.getElementById('msv-input-1');
            var name = document.getElementById('name-input-1');
            var nameSub = document.getElementById('status-downs').value;
            var arr = [];

            document.querySelector('#nameSubject').innerText = `Học phần: ${nameSub}`;

            var a = parseInt(i / 4);
            var b = i % 4 + 1;

            for (let j = 0; j < 4; j++) {
                arr[j] = soure.Score[a][`sub${b}`][j];
            }

            msv.value = soure.id;
            name.value = soure.name;

            for (var j = 0; j < arr.length; j++) {
                var point = document.getElementById('sub-' + (j + 1));
                point.value = arr[j];
            }

            document.getElementById('saveS').onclick = function () {
                if (!!isNaN(msv.value)) {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Mã sinh không được chứa kí tự chữ', 5000);
                    return;
                }
                if (msv.value.trim() === '') {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Mã sinh không được để trống', 5000);
                    return;
                }
                if (name.value.trim() === '') {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Họ tên không được để trống', 5000);
                    return;
                }
                var s = true;
                for (var j = 0; j < arr.length; j++) {
                    var point = document.getElementById('sub-' + (j + 1));
                    if (point.value > 10 || point.value < 0) {
                        s = false;
                        break;
                    } else if (point.value == "") {
                        continue;
                    }
                }
                if (s == false) {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Điểm nhập vào không hợp lệ, hãy nhập lại', 5000);
                    return;
                }
                for (var j = 0; j < arr.length; j++) {
                    var point = document.getElementById('sub-' + (j + 1));
                    arr[j] = point.value;
                }

                var formData = {
                    id: msv.value,
                    name: name.value,
                    gender: soure.gender,
                    date: soure.date,
                    email: soure.email,
                    datein: soure.datein,
                    status: soure.status,
                    Score: []
                };

                for (var term = 0; term < 3; term++) {
                    var termData = {
                        term: (term + 1).toString(),
                        sub1: [],
                        sub2: [],
                        sub3: [],
                        sub4: []
                    };


                    for (var j = 0; j < 4; j++) {
                        if (term != a) {
                            termData.sub1.push(soure.Score[term].sub1[j]);
                            termData.sub2.push(soure.Score[term].sub2[j]);
                            termData.sub3.push(soure.Score[term].sub3[j]);
                            termData.sub4.push(soure.Score[term].sub4[j]);
                        } else {
                            if (b == 1) {
                                termData.sub1.push(arr[j]);
                                termData.sub2.push(soure.Score[term].sub2[j]);
                                termData.sub3.push(soure.Score[term].sub3[j]);
                                termData.sub4.push(soure.Score[term].sub4[j]);
                            } else if (b == 2) {
                                termData.sub1.push(soure.Score[term].sub1[j]);
                                termData.sub2.push(arr[j]);
                                termData.sub3.push(soure.Score[term].sub3[j]);
                                termData.sub4.push(soure.Score[term].sub4[j]);
                            } else if (b == 3) {
                                termData.sub1.push(soure.Score[term].sub1[j]);
                                termData.sub2.push(soure.Score[term].sub2[j]);
                                termData.sub3.push(arr[j]);
                                termData.sub4.push(soure.Score[term].sub4[j]);
                            } else if (b == 4) {
                                termData.sub1.push(soure.Score[term].sub1[j]);
                                termData.sub2.push(soure.Score[term].sub2[j]);
                                termData.sub3.push(soure.Score[term].sub3[j]);
                                termData.sub4.push(arr[j]);
                            }
                        }
                    }

                    formData.Score.push(termData);
                }
                console.log(formData);
                changeMember(id, formData, function () {
                    fetchDataFromAPI(changeselectSubject);
                    $(".change-point").fadeOut(200);
                    $("#cover").css('position', 'relative');
                    pushAlert('<i class="fa-solid fa-circle-check"></i>', 'Thành công', 'Thay đổi điểm thành công', 5000);
                })
            };
        })
}