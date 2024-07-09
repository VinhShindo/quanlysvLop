var soureAPI = 'http://localhost:3000/Students';

const formAdd = document.getElementById('form-add');
const formChange = document.getElementById('form-change')
const cover = document.getElementById('cover');
const newButton = document.getElementById('new');
const saveButton = document.getElementById('save');
const listgruop = document.querySelector("#groups");
const dialogTask = document.querySelector("dialog");
const dialogCancelButton = document.getElementById('cancel-dialog');
const dialogConfirmButton = document.getElementById('confirm-dialog');

function start() {
    getMember(renderMember);
    getMember(haddleAddForm);
}
start()

function renderMember(lists) {
    var sum = 0;
    var htmls = lists.map(function (list, index) {
        sum += 1;
        return `
        <tr class="member-${list.id}">
            <td>${index + 1}</td>
            <td>${list.id}</td>
            <td>${list.name}</td>
            <td>${list.gender}</td>
            <td>${list.date}</td>
            <td>${list.email}</td>
            <td>${list.datein}</td>
            <td class="status">${list.status}</td>
            <td>
                <button id="change" onclick="handdleChangeMember(${list.id})">Sửa</button>
                <button id="delete" onclick="handdleDeleteMember(${list.id})">Xóa</button>
            </td>
        </tr>
        `;
    })
    listgruop.innerHTML = htmls.join('');
    var statusCells = listgruop.querySelectorAll(".status");
    document.getElementById('sums').textContent = sum;
    statusCells.forEach(function (cell) {
        var status = cell.innerText.trim();
        var b = status.toUpperCase();
        if (b === "ĐANG THEO HỌC") {
            cell.style.color = "green";
        } else if (b === "BẢO LƯU") {
            cell.style.color = "rgb(119, 101, 1)";
        } else if (b === "THÔI HỌC") {
            cell.style.color = "red";
        } else {
            cell.style.color = "black";
        }
    });
}
function getMember(callback) {
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

function creataMember(data, callback) {
    fetch(soureAPI, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json()
    }).then(callback)
}
function haddleAddForm(lists) {
    newButton.onclick = function () {
        var msv = document.getElementById('msv-input').value;
        var name = document.getElementById('name-input').value;
        var date = document.getElementById('date-input').value;
        var email = document.getElementById('email-input').value;
        var selectedGender = document.querySelector('input[name="gender"]:checked');
        var isDuplicate = false;

        if (!!isNaN(msv)) {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Mã sinh không được chứa kí tự chữ', 5000);
            return;
        }
        if (msv.trim() === '') {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Mã sinh không được để trống', 5000);
            return;
        }
        lists.map((value) => {
            if (msv == value.id) {
                isDuplicate = true;
                return;
            }
        })
        if (isDuplicate) {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Mã sinh viên đã có, hãy nhập lại', 5000);
            return;
        }
        if (name.trim() === '') {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Họ tên không được để trống', 5000);
            return;
        }
        if (!selectedGender) {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Giới tính không được để trống', 5000);
            return;
        }
        var gendervalue = document.querySelector('label[for="' + selectedGender.id + '"]').innerHTML;
        if (date.trim() === '') {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Ngày sinh không được để trống', 5000);
            return;
        }
        var dob = new Date(date);
        var today = new Date();
        var age = today.getFullYear() - dob.getFullYear();
        var m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Ngày sinh nhập không đúng', 5000);
            return;
        }
        var formattedDate = changeDateToJson(date);
        if (email.trim() === '') {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Email không được để trống', 5000);
            return;
        }
        if (checkEmail(email) == false) {
            pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Email nhập không đúng định dạng', 5000);
            return;
        }
        var formData = {
            id: msv,
            name: name,
            gender: gendervalue,
            date: formattedDate,
            email: email,
            datein: "05/09/2023",
            status: "Đang theo học",
            Score: [
                {
                    term: "1",
                    sub1: ["", "", "", ""],
                    sub2: ["", "", "", ""],
                    sub3: ["", "", "", ""],
                    sub4: ["", "", "", ""]
                },
                {
                    "term": "2",
                    sub1: ["", "", "", ""],
                    sub2: ["", "", "", ""],
                    sub3: ["", "", "", ""],
                    sub4: ["", "", "", ""]
                },
                {
                    "term": "3",
                    sub1: ["", "", "", ""],
                    sub2: ["", "", "", ""],
                    sub3: ["", "", "", ""],
                    sub4: ["", "", "", ""]
                }
            ]
        }
        creataMember(formData, function () {
            getMember(renderMember);
            document.getElementById('msv-input').value = '';
            document.getElementById('name-input').value = '';
            document.getElementById('date-input').value = '';
            document.getElementById('email-input').value = '';

            $("#form-add").fadeOut(200);
            $("#cover").css('position', 'relative');
        })
        pushAlert('<i class="fa-solid fa-circle-check"></i>', 'Thành công', 'Bạn vừa tạo thành công', 5000);
    }
}

function handdleDeleteMember(id) {
    dialogTask.show();
    cover.style.position = "fixed";
    dialogCancelButton.onclick = () => {
        dialogTask.close();
        cover.style.position = "relative";
    }
    dialogConfirmButton.onclick = () => {
        dialogTask.close();
        cover.style.position = "relative"
        fetch(soureAPI + '/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            return response.json()
        }).then(function () {
            pushAlert('<i class="fa-solid fa-circle-check"></i>', 'Thành công', 'Bạn vừa xóa thành công', 5000);
            getMember(renderMember);
        })
    }
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
    $("#form-change").fadeIn(300);
    $("#cover").css('position', 'fixed');
    fetch(soureAPI + `/${id}`)
        .then(function (response) {
            return response.json()
        }).then(function (soure) {
            var msv = document.getElementById('msv-change');
            var name = document.getElementById('name-change');
            var date = document.getElementById('date-change');
            var email = document.getElementById('email-change');
            var dateIn = document.getElementById('date-in-change');
            var status = document.getElementById('status-change');

            var formattedDate = changeDateToInput(soure.date);
            var formattedDateIn = changeDateToInput(soure.datein);
            var inputRadio;
            if (soure.gender === "Nam") {
                inputRadio = document.getElementById('male-change');
            } else if (soure.gender === "Nữ") {
                inputRadio = document.getElementById('fmale-change');
            } else {
                inputRadio = document.getElementById('other-change');
            }

            msv.value = soure.id;
            name.value = soure.name;
            date.value = formattedDate;
            email.value = soure.email;
            dateIn.value = formattedDateIn;
            status.value = soure.status;
            if (inputRadio) {
                inputRadio.checked = true;
            }

            saveButton.onclick = function () {
                var selectedGender = document.querySelector('input[name="gender"]:checked');
                var gendervalue = document.querySelector('label[for="' + selectedGender.id + '"]').innerHTML;
                var formattedDateChange = changeDateToJson(date.value);
                var formattedDateInChange = changeDateToJson(dateIn.value);
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
                if (email.value === '') {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Email không được để trống', 5000);
                    return;
                }
                if (checkEmail(email.value) == false) {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Email nhập không đúng định dạng', 5000);
                    return;
                }
                if (status.value == "Đang theo học" || status.value == "Bảo lưu" || status.value == "Thôi học") {
                    
                } else {
                    pushAlert('<i class="fa-solid fa-circle-xmark"></i>', 'Cảnh báo', 'Trạng thái nhập học không đúng', 5000);
                    return;
                }
                var formData = {
                    id: msv.value,
                    name: name.value,
                    gender: gendervalue,
                    date: formattedDateChange,
                    email: email.value,
                    datein: formattedDateInChange,
                    status: status.value,
                    Score: [
                        {
                            term: "1",
                            sub1: ["", "", "", ""],
                            sub2: ["", "", "", ""],
                            sub3: ["", "", "", ""],
                            sub4: ["", "", "", ""]
                        },
                        {
                            "term": "2",
                            sub1: ["", "", "", ""],
                            sub2: ["", "", "", ""],
                            sub3: ["", "", "", ""],
                            sub4: ["", "", "", ""]
                        },
                        {
                            "term": "3",
                            sub1: ["", "", "", ""],
                            sub2: ["", "", "", ""],
                            sub3: ["", "", "", ""],
                            sub4: ["", "", "", ""]
                        }
                    ]
                }
                changeMember(id, formData, function () {
                    getMember(renderMember);
                    $("#form-change").fadeOut(200);
                    $("#cover").css('position', 'relative');
                    pushAlert('<i class="fa-solid fa-circle-check"></i>', 'Thành công', 'Bạn vừa sửa thông tin thành công', 5000);
                })
            };
        })
}

const changeDateToInput = (date) => {
    var parts = date.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    var dateFormat = new Date();
    dateFormat.setFullYear(year, month - 1, day);
    var formattedDate = dateFormat.toISOString().slice(0, 10);
    return formattedDate;
}
const changeDateToJson = (date) => {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
    return formattedDate;
}
const checkEmail = (email) => {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const validEmails = [
        "user@example.com",
        "john.doe@company.co.uk",
        "admin@my-site.net",
        "first.last@sub.domain.co"
    ];
    return emailRegex.test(email);
}

function getFilterData(data) {
    const targetStatus = document.getElementById('status-down').value;
    var userFilter = data.filter(value => {
        return value.status.toUpperCase().includes(targetStatus.toUpperCase());
    })
    if (targetStatus == "Tất cả") {
        getMember(renderMember);
    } else {
        renderMember(userFilter)
    }
}
function filterMember() {
    getMember(getFilterData);
}

$(document).ready(function () {
    $(".btn-43").click(function () {
        $("#form-add").fadeIn(300);
        $("#cover").css('position', 'fixed');
    })
    $("#cancel, .fa-xmark").click(function () {
        $("#form-add").fadeOut(200);
        $("#form-change").fadeOut(200);
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
    renderMember(userSearch);
}

function searchUser() {
    getMember(handleMemberData);
}