var soureAPI = 'http://localhost:3000/Students';

const listgruop = document.querySelector("#groups");
const formChange = document.querySelector('.form-change');
const cover = document.getElementById('cover');
const saveButton = document.getElementById('save')
const cancelButon = document.getElementById('cancel');

function start() {
    getData(renderData);
}
start()

function renderData(lists) {
    var htmls = lists.map(function (list, index) {
        var arrPoint = new Array(9);
        var arrAverage = new Array(3);
        var arrPL = new Array(3);
        var i = 0;
        list.Score.map((li) => {
            arrPoint[i] = li.firtS;
            arrPoint[i + 1] = li.middleS;
            arrPoint[i + 2] = li.lastS;
            i += 3;
        })
        var t = 0;
        for (let j = 0; j < 3; j++) {
            arrAverage[j] = ((parseInt(arrPoint[t]) + parseInt(arrPoint[t + 1]) * 2 + parseInt(arrPoint[t + 2]) * 3) / 6).toFixed(1);
            if (arrAverage[j] >= 9 && arrAverage[j] <= 10) {
                arrPL[j] = "Xuất sắc";
            } else if (arrAverage[j] >= 8 && arrAverage[j] < 9) {
                arrPL[j] = "Giỏi";
            } else if (arrAverage[j] >= 6 && arrAverage[j] < 8) {
                arrPL[j] = "Khá";
            } else if (arrAverage[j] >= 4 && arrAverage[j] < 6) {
                arrPL[j] = "TB";
            } else {
                arrPL[j] = "Yếu";
            }
            t += 3;
        }

        return `
            <tr>
                <td rowspan="3">${index + 1}</td>
                <td rowspan="3">${list.id}</td>
                <td rowspan="3" id="name">${list.name}</td>
                <td>1</td>
                <td>${arrPoint[i - 9]}</td>
                <td>${arrPoint[i - 8]}</td>
                <td>${arrPoint[i - 7]}</td>
                <td>${arrAverage[0]}</td>
                <td>${arrPL[0]}</td>
                <td rowspan="3"><button id="buttonS" class="bn3637 bn37" onclick="handdleChangeMember(${list.id})">Sửa</button></td>
            </tr>
            <tr>
                <td>2</td>
                <td>${arrPoint[i - 6]}</td>
                <td>${arrPoint[i - 5]}</td>
                <td>${arrPoint[i - 4]}</td>
                <td>${arrAverage[1]}</td>
                <td>${arrPL[1]}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>${arrPoint[i - 3]}</td>
                <td>${arrPoint[i - 2]}</td>
                <td>${arrPoint[i - 1]}</td>
                <td>${arrAverage[2]}</td>
                <td>${arrPL[2]}</td>
            </tr>
            `;
    })
    listgruop.innerHTML = htmls.join('');
}

function getData(callback) {
    fetch(soureAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.sort((a, b) => a.id - b.id);
            callback(data);
            return data;
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
            var msv = document.getElementById('msv-input');
            var name = document.getElementById('name-input');
            var arrPoint = new Array(9);
            var i = 0;
            soure.Score.map((li) => {
                arrPoint[i] = li.firtS;
                arrPoint[i + 1] = li.middleS;
                arrPoint[i + 2] = li.lastS;
                i += 3;
            })
            msv.value = soure.id;
            name.value = soure.name;
            for (var i = 0; i < arrPoint.length; i++) {
                var point = document.getElementById('term-' + Math.ceil((i + 1) / 3) + '-' + ((i % 3) + 1));
                point.value = arrPoint[i];
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
                for (var i = 0; i < arrPoint.length; i++) {
                    var point = document.getElementById('term-' + Math.ceil((i + 1) / 3) + '-' + ((i % 3) + 1));
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
                var formData = {
                    id: msv.value,
                    name: name.value,
                    gender: soure.gender,
                    date: soure.date,
                    email: soure.email,
                    datein: soure.datein,
                    status: soure.status,
                    Score: [
                        {
                            term: "1",
                            firtS: document.getElementById('term-1-1').value,
                            middleS: document.getElementById('term-1-2').value,
                            lastS: document.getElementById('term-1-3').value
                        },
                        {
                            term: "2",
                            firtS: document.getElementById('term-2-1').value,
                            middleS: document.getElementById('term-2-2').value,
                            lastS: document.getElementById('term-2-3').value
                        },
                        {
                            term: "3",
                            firtS: document.getElementById('term-3-1').value,
                            middleS: document.getElementById('term-3-2').value,
                            lastS: document.getElementById('term-3-3').value
                        }
                    ]
                }
                changeMember(id, formData, function () {
                    getData(renderData);
                    $(".form-change").fadeOut(200);
                    $("#cover").css('position', 'relative');
                    pushAlert('<i class="fa-solid fa-circle-check"></i>', 'Thành công', 'Bạn vừa sửa thông tin thành công', 5000);
                })
            };
        })
}

function renderDataterm(lists) {
    var i = document.getElementById('status-down').value;
    if (i == "Tất cả") {
        getData(renderData);
    } else {
        var htmls = lists.map(function (list, index) {
            var average = ((parseInt(list.Score[i-1].firtS) + parseInt(list.Score[i-1].middleS)*2 + parseInt(list.Score[i-1].lastS)*3) / 6).toFixed(1);
            if (average >= 9 && average <= 10) {
                var PL = "Xuất sắc";
            } else if (average >= 8 && average < 9) {
                var PL = "Giỏi";
            } else if (average >= 6 && average < 8) {
                var PL = "Khá";
            } else if (average >= 4 && average < 6) {
                var PL = "TB";
            } else {
                var PL = "Yếu";
            }
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${list.id}</td>
                    <td id="name">${list.name}</td>
                    <td>${i}</td>
                    <td>${list.Score[i-1].firtS}</td>
                    <td>${list.Score[i-1].middleS}</td>
                    <td>${list.Score[i-1].lastS}</td>
                    <td>${average}</td>
                    <td>${PL}</td>
                    <td><button id="buttonS" class="bn3637 bn37" onclick="handdleChangeMember(${list.id})">Sửa</button></td>
                </tr>
                `;
        })
        listgruop.innerHTML = htmls.join('');
    }
}

function filterMember() {
    getData(renderDataterm);
}

$(document).ready(function () {
    $("#cancel").click(function () {
        $(".form-change").fadeOut(200);
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
    var userSearch = data.filter(value => {
        return value.name.toUpperCase().includes(valueSearchInput.toUpperCase())
    })
    renderData(userSearch);
}

function searchUser() {
    getData(handleMemberData);
}