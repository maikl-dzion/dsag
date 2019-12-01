<template>
    <div>

        <table>
            <!--<tr><th>&nbsp;</th><th>2004</th><th>2005</th><th>2006</th></tr>-->
            <tr>
                <td>
                    <div class="filter-label" style="width: 120px;">№ обращения с...</div>
                </td>
                <td>
                    <div class="filter-input" style="width: 100px;">
                        <input type="text" style="width: 100%; border:1px #b5b8c8 solid"></div>
                </td>
                <td> по...</td>
                <td>
                    <div class="filter-input" style="width: 100px;">
                        <input type="text" style="width: 100%; border:1px #b5b8c8 solid"></div>
                </td>
            </tr>

            <tr>
                <td>
                    <div class="filter-label" style="width: 140px;">Дата обращения с...</div>
                </td>
                <td>
                    <div class="filter-input" style="width: 100px;">
                        <input type="date" style="width: 100%; border:1px #b5b8c8 solid"></div>
                </td>
                <td> по...</td>
                <td>
                    <div class="filter-input" style="width: 100px;">
                        <input type="date" style="width: 100%; border:1px #b5b8c8 solid"></div>
                </td>
            </tr>
        </table>

    </div>
</template>

<script>
    export default {
        name: "filters-component"
    }
</script>

<style scoped>

    TABLE {
        width: 400px; /* Ширина таблицы */
        border-collapse: collapse; /* Убираем двойные линии между ячейками */
    }

    TD, TH {
        padding: 3px; /* Поля вокруг содержимого таблицы */
        border-bottom: 1px solid gainsboro; /* Параметры рамки */
    }

    TH {
        background: #b0e0e6; /* Цвет фона */
    }

</style>