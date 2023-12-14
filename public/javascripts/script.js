$(function () {
    loadProducts();

    $("#recipes").on("click", ".btn-danger", handleDelete);
    $("#recipes").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addProduct);
    $("#updateSave").click(updateProduct);
});

function loadProducts() {
    $.ajax({
        url: "http://localhost:3000/api/products",
        method: "GET",
        error: function (response) {
            var recipies = $("#recipes");
            recipies.html("An error has occurred");
        },
        success: function (response) {
            console.log(response);
            var recipies = $("#recipes");
            recipies.empty();
            for (var i = 0; i < response.length; i++) {
                var cheez = response[i];
                recipies.append(`
                    <div class="product" data-id=${cheez._id}>
                        <h3>${cheez.name} 
                            <button class="btn btn-danger btn-sm float-end">Delete</button>
                            <button class="btn btn-warning btn-sm float-end">Edit</button>
                        </h3>
                        <p>${cheez.price}</p>
                    </div>
                `);
            }
        }
    });
}

function handleDelete() {
    let btn = $(this);
    let parentDiv = btn.closest(".product");
    let id = parentDiv.attr("data-id");

    $.ajax({
        url: `http://localhost:3000/api/products/${id}`,
        method: "DELETE",
        success: function () {
            loadProducts();
        }
    });
}

function addProduct() {
    var name = $("#title").val();
    var price = $("#body").val();

    $.ajax({
        url: "http://localhost:3000/api/products",
        method: "POST",
        data: { name, price },
        success: function (response) {
            console.log(response);
            $("#title").val("");
            $("#body").val("");
            loadProducts();
            $("#addModal").modal("hide");
        }
    });
}

function handleUpdate() {
    let btn = $(this);
    let parentDiv = btn.closest(".product");
    let id = parentDiv.attr("data-id");

    $.get(`http://localhost:3000/api/products/${id}`,
        function (response) {
            $("#UpdateTitle").val(response.name);
            $("#Updatebody").val(response.price);
            $("#UpdateModal").modal("show");
            $("#UpdateID").val(response._id);
        });
}

function updateProduct() {
    var id = $("#UpdateID").val();
    var name = $("#UpdateTitle").val();
    var price = $("#Updatebody").val();

    $.ajax({
        url: `http://localhost:3000/api/products/${id}`,
        data: { name, price },
        method: "PUT",
        success: function (response) {
            console.log(response);
            loadProducts();
            $("#UpdateModal").modal("hide");
        }
    });
}
