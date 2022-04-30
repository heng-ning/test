// 彈窗套件
function loginMember(msg, icon, html) {
    Swal.fire({
        title: msg,
        icon: icon,
        html: html,

        showConfirmButton: false, // 確認按鈕（預設會顯示不用設定）
        confirmButtonText: '參加活動', //　按鈕顯示文字
        confirmButtonAriaLabel: '參加活動', // 網頁無障礙用
        confirmButtonColor: '#75706b', // 修改按鈕色碼

        // 使用同確認按鈕
        // showDenyButton: true, // 否定按鈕
        showCancelButton: false, // 取消按鈕

        buttonsStyling: false, // 是否使用sweetalert按鈕樣式（預設為true）
    })
}

// 註冊頁面點擊有施打疫苗即顯示種類; 無不顯示
$(document).ready(function () {
    $("#yes").click(function () {
        $(".kind").css("display", "block")
    });
    $("#no").click(function () {
        $(".kind").css("display", "none")
    })
})

// 登入成功 跳出燈箱
let result = JSON.parse(sessionStorage.getItem('status'));
// console.log(result.successful);
$(document).ready(function () {
    $("#select").on('click', function () {
        console.log(result);
        if (result == null) {
            $(".box").css("display", "none")
        } else {
            $(".box").css("display", "block");
        }
    })

    // 燈箱 close 即移除資料 
    $("#close").click(function () {
        // e.preventDefault();
        // console.log(result);
        sessionStorage.removeItem("status");
        $(".box").css("display", "none")
    })
})


// 使用jQuery Ajax 連結資料庫到燈箱
$(document).ready(function () {
    // let result = JSON.parse(sessionStorage.getItem('status'));
    fetch('./select.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify({
                id: result.id,
            })
        })
        .then(res => res.json())
        .then(res => {
            $("#disabledTextInput").val(res[0].id)
            $("#memberName").val(res[0].name)
            $("#memberStatus").val(res[0].isTrue)
            $("#memberKind").val(res[0].kind)
            console.log(res)
        })
})

// // 更改的會員資料update進mySQL

// $(document).ready(function () {
//     $("#memberSubmit").click(function (e) {
//         e.preventDefault();
//         var name = document.getElementById("memberName").value;
//         var status = document.getElementById("memberStatus").value;
//         var kind = document.getElementById("memberKind").value;
//         // console.log(status, kind);

//         fetch("memberUpdate.php", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//                 mode: "cors",
//                 body: JSON.stringify({
//                     name: name,
//                     status: status,
//                     kind: kind,
//                 }),
//             })

//             // 判定更新是否成功 成功: alert資料已更新
//             .then(response => {
//                 if (response.ok) {
//                     alert("資料已更新");
//                 } else {
//                     alert("Error");
//                 }
//             })
//     })
// });