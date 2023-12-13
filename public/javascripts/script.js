$(function () {
    loadProducts();

    $("#products").on("click", ".btn-danger", handleDelete);
    $("#products").on("click", ".btn-warning", handleUpdate);

    $("#addBtn").click(addProduct);
    $("#updateSave").click(updateProduct);
});

function loadProducts() {
    $.ajax({
        url: "http://localhost:3000/api/products",
        method: "GET",
        error: function (response) {
            var products = $("#products");
            products.html("An error has occurred");
        },
        success: function (response) {
            console.log(response);
            var products = $("#products");
            products.empty();
            for (var i = 0; i < response.length; i++) {
                var product = response[i];
                products.append(`
                    <div class="product" data-id="${product._id}">
                        <h3>${product.title} 
                            <button class="btn btn-danger btn-sm float-end">Delete</button>
                            <button class="btn btn-warning btn-sm float-end">Edit</button>
                        </h3>
                        <p>${product.body}</p>
                    </div>
                `);
            }
        }
    });
}

function handleDelete() {
    let btn = $(this);
    let parentDiv = btn.closest(".product");
    let id = parentDiv.data("id");

    $.ajax({
        url: `http://localhost:3000/api/products/${id}`,
        method: "DELETE",
        success: function () {
            loadProducts();
        }
    });
}

function addProduct() {
    var title = $("#title").val();
    var body = $("#body").val();

    $.ajax({
        url: "http://localhost:3000/api/products",
        method: "POST",
        data: { title, body },
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
    let id = parentDiv.data("id");

    $.get(`http://localhost:3000/api/products/${id}`, function (response) {
        $("#updateID").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");
    });
}

function updateProduct() {
    var id = $("#updateID").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();

    $.ajax({
        url: `http://localhost:3000/api/products/${id}`,
        data: { title, body },
        method: "PUT",
        success: function (response) {
            console.log(response);
            loadProducts();
            $("#updateModal").modal("hide");
        }
    });
}
