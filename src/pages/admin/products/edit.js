import urlApi, { urlCate } from "../../../config/config";
import axios from "axios";
import { $, $$ } from "../../../utilities";
import { router, useState, useEffect } from "../../../lib";

const AdminProductEdit = ({ id }) => {
    const [data, setData] = useState([]);
    const [cate, setCate] = useState([]);

    useEffect(() => {
        axios.get(urlApi)
            .then(({ data }) => {
                const itemFilter = data.find(item => item.id === +id);
                setData(itemFilter);
            })
        axios.get(urlCate)
            .then(({ data }) => {
                setCate(data);
            });
    }, []);

    axios.get(urlApi).then(() => {
        $(".editForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.querySelector(".title");
            const desc = document.querySelector(".description");
            const price = document.querySelector(".price");
            const image = document.querySelector(".image");
            const cate = document.querySelector(".category");
            const put = {
                name: title.value,
                description: desc.value,
                category: cate.value,
                short_description: desc.value,
                list_price: price.value,
                original_price: price.value,
                images: image.value === "" ? ["https://picsum.photos/200/300"] : [image.value],
            };
            axios.put(urlApi + "/" + id, put).then(() => {
                alert(`Edit ${put.name} Success`), router.navigate("admin/products/");
            });
        });
    });
    return `
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
        <form
        action=""
        class="editForm mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p class="text-center text-lg font-medium">Edit</p>

            <div>
                <label for="email" class="sr-only">Email</label>

                <div class="relative">
                <input
                    type="text"
                    value="${data.name}"
                    class="title w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="title"
                />
                </div>
            </div>

            <div>
                <label for="email" class="sr-only">Email</label>

                <div class="relative">
                <input
                    type="text"
                    value="${data.images?.[0]}"
                    class="image w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="link image"
                />
                </div>
            </div>

            <div>
                <label for="email" class="sr-only">Email</label>

                <div class="relative">
                    <select class="category w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-500">
                        <option value="${data.category}">${data.category}</option>
                        ${cate.map((i) => {
                            return `
                                <option value="${i.name}">${i.name}</option>
                            `
                            }).join('')}
                    </select>
                </div>
            </div>

            <div>
                <label for="password" class="sr-only">Password</label>

                <div class="relative">
                <input
                    type="text"
                    value="${data.short_description}"
                    class="description w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Description"
                />
                </div>
            </div>

            <div>
            <label for="password" class="sr-only">Password</label>

            <div class="relative">
            <input
                type="number"
                value="${data.original_price}"
                class="price w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Price"
            />

            </div>
        </div>

            <button
                type="submit"
                class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
                Edit
            </button>
        </form>
    </div>
    </div>
  `;
};

export default AdminProductEdit;
