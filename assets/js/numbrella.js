//TODO rewrite field array to generated array.
var field = [
    '1' , '2', '3', '4', '5', '6', '7', '8', '9',
    '1' , '1', '1', '2', '1', '3', '1', '4', '1',
    '5' , '1', '6', '1', '7', '1', '8', '1', '9',
    '2' , '1', '2', '2', '2', '3', '2', '4', '2',
    '5' , '2', '6', '2', '7', '2', '8', '2', '9',
    '3' , '1', '3', '2', '3', '3', '3', '4', '3',
    '5' , '3', '6', '3', '7', '3', '8', '3', '9',
    '4' , '1', '4', '2', '4', '3', '4', '4', '4',
    '5' , '4', '6', '4', '7', '4', '8', '4', '9',
    '5' , '1', '5', '2', '5', '3', '5', '4', '5',
    '5' , '5', '6', '5', '7', '5', '8', '5', '9',
    '6' , '1', '6', '2', '6', '3', '6', '4', '6',
    '5' , '6', '6', '6', '7', '6', '8', '6', '9',
    '7' , '1', '7', '2', '7', '3', '7', '4', '7',
    '5' , '7', '6', '7', '7', '7', '8', '7', '9',
    '8' , '1', '8', '2', '8', '3', '8', '4', '8',
    '5' , '8', '6', '8', '7', '8', '8', '8', '9',
    '9' , '1', '9', '2', '9', '3', '9', '4', '9',
    '5' , '9', '6', '9', '7', '9', '8', '9', '9',
];

const lineLimit = 9;
var firstC = null;
var progress = 0;

/**
 * Called for draw base gaming field.
 */
initField();

/**
 * Init function.
 *
 * Draw base field.
 *
 * @return void
 */
function initField() {
    field.forEach(function (value, index, array) {
        index++;

        var row  = Math.ceil(index / 9);
        var calcRow = Math.ceil(index / 9);
        var digit = index - (9 * (calcRow - 1));

        cell = createCell(row + ":" + digit, value);
        fieldAddChild(cell);

        if (!(index % 9)) {
             fieldAddChild(document.createElement("br"));
         }
    })
}

/**
 * Create cell.
 *
 * Used for creating cells one by one.
 *
 * @param id
 * @param value
 * @return {HTMLDivElement}
 */
function createCell(id, value) {
    var cell  = document.createElement("div");
    cell.id = id;
    cell.innerHTML = value;
    cell.classList.add("cell");
    cell.classList.add("active");
    cell.setAttribute("onclick", "clickCell(this)");

    return cell;
}

/**
 * Click cell observer.
 *
 * @param elem
 */
function clickCell(elem) {
    elem.classList.add("pushed");

    if (!firstC) {
        firstC = elem;

        return;
    }

    compare(elem) ? compareSuccess(firstC, elem) : compareFail(firstC, elem);
}

/**
 * Compare.
 *
 * Compare two elements, if in one line or column and values the same return true.
 *
 * @param elem
 * @return {boolean}
 */
function compare(elem) {
    var first = firstC.id.split(":");
    var second = elem.id.split(":");
    var firstVal = firstC.innerHTML;
    var secondVal = elem.innerHTML;

    if (first[0] === second[0] && firstVal === secondVal) {
        return checkRow(first[0], first[first.length - 1], second[second.length - 1]);
    }

    if (first[first.length - 1] === second[second.length - 1] && firstVal === secondVal) {
        return checkColumn(first[first.length - 1], first[0], second[0]);
    }

    return false;
}

/**
 * Compare success procedure.
 *
 * @param first
 * @param second
 */
function compareSuccess(first, second) {
    addInactive(first, second);
    firstC = null;
    updateProgress();
}

/**
 * Compare fail procedure.
 *
 * @param first
 * @param second
 */
function compareFail(first, second) {
    first.classList.remove("pushed");
    second.classList.remove("pushed");
    firstC = null;
}

/**
 * Add inactive for cell.
 *
 * @param first
 * @param second
 */
function addInactive(first, second) {
    first.classList.remove("active");
    second.classList.remove("active");
    first.classList.add("inactive");
    second.classList.add("inactive");
}

/**
 * Check values in row.
 *
 * Called if user clicked values in one row.
 *
 * @param rowId
 * @param first
 * @param second
 * @return {boolean}
 */
function checkRow(rowId, first, second) {
    var max = Math.max(first, second);
    var min  = Math.min(first, second);

    if (max - min === 1) {
        return true;
    }

    min++;

    for(var i = min; i < max; i++) {
        console.log(document.getElementById(rowId + ":" + i));
        if (document.getElementById(rowId + ":" + i).classList.contains("active")) {
            return false;
        }
    }

    return true;
}

/**
 * Check values in column.
 *
 * Called if user clicked values in one column.
 *
 * @param colId
 * @param first
 * @param second
 * @return {boolean}
 */
function checkColumn(colId, first, second) {
    var max = Math.max(first, second);
    var min  = Math.min(first, second);

    if (max - min === 1) {
        return true;
    }

    min++;

    for(var i = min; i < max; i++) {
        console.log(document.getElementById(i + ":" + colId));
        if (document.getElementById(i + ":" + colId).classList.contains("active")) {
            return false;
        }
    }

    return true;
}

/**
 * Add child to field block.
 *
 * @param element
 */
function fieldAddChild(element) {
    document.getElementById('field').appendChild(element);
}

/**
 * Calculate progress.
 */
function updateProgress() {
    progress++;
    var percent = Math.round(100 / 81 * progress);
    document.getElementById("counter").innerHTML = percent;
}
