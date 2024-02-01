/**
 * Numbrella game class.
 */
class NumbrellaGame {
    constructor() {
        this.lineLimit = 9;
        this.firstC = null;
        this.progress = 0;
        this.field = this.generateNumberArray();
        this.initField();
    }

    /**
     * Init function.
     *
     * Draw base field.
     *
     * @return void
     */
    initField() {
        this.field.forEach((value, index) => {
            index++;
            const row = Math.ceil(index / this.lineLimit);
            const calcRow = Math.ceil(index / this.lineLimit); // Used as proxy for calculation
            const digit = index - (this.lineLimit * (calcRow - 1));
            const cell = this.createCell(`${row}:${digit}`, value);
            this.fieldAddChild(cell);

            if (!(index % this.lineLimit)) {
                this.fieldAddChild(this.getSeparator());
            }
        });
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
    createCell(id, value) {
        const cell = document.createElement("div");
        cell.id = id;
        cell.innerHTML = value;
        cell.classList.add("cell");
        cell.classList.add("active");
        cell.addEventListener("click", () => this.clickCell(cell));

        return cell;
    }

    /**
     * Click cell observer.
     *
     * @param elem
     */
    clickCell(elem) {
        elem.classList.add("pushed");

        if (!this.firstC) {
            this.firstC = elem;
            return;
        }

        this.compare(elem) ? this.compareSuccess(this.firstC, elem) : this.compareFail(this.firstC, elem);
    }

    /**
     * Compare.
     *
     * Compare two elements, if in one line or column and values the same return true.
     *
     * @param elem
     * @return {boolean}
     */
    compare(elem) {
        const first = this.firstC.id.split(":");
        const second = elem.id.split(":");

        if (this.sameValue(this.firstC.innerHTML, elem.innerHTML) && !this.sameElem(elem)) {

            if (first[0] === second[0]) {
                return this.checkRow(first[0], first[first.length - 1], second[second.length - 1]);
            }

            if (first[first.length - 1] === second[second.length - 1]) {
                return this.checkColumn(first[first.length - 1], first[0], second[0]);
            }
        }

        return false;
    }

    /**
     * Compare success procedure.
     *
     * @param first
     * @param second
     */
    compareSuccess(first, second) {
        this.addInactive(first, second);
        this.firstC = null;
        this.updateProgress();
    }

    /**
     * Compare fail procedure.
     *
     * @param first
     * @param second
     */
    compareFail(first, second) {
        first.classList.remove("pushed");
        second.classList.remove("pushed");
        this.firstC = null;
    }

    /**
     * Add inactive for cell.
     *
     * @param first
     * @param second
     */
    addInactive(first, second) {
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
    checkRow(rowId, first, second) {
        const max = Math.max(first, second);
        const min = Math.min(first, second);

        if (max - min === 1) {
            return true;
        }

        for (let i = min + 1; i < max; i++) {
            if (this.checkIfActive(`${rowId}:${i}`)) {
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
    checkColumn(colId, first, second) {
        const max = Math.max(first, second);
        const min = Math.min(first, second);

        if (max - min === 1) {
            return true;
        }

        for (let i = min + 1; i < max; i++) {
            if (this.checkIfActive(`${i}:${colId}`)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if block active.
     *
     * @param id
     * @return {boolean}
     */
    checkIfActive(id) {
        return document.getElementById(id).classList.contains("active")
    }

    /**
     * Check if value same.
     *
     * @param first
     * @param second
     * @return {boolean}
     */
    sameValue(first, second) {
        return first === second;
    }

    /**
     * Check if same element.
     *
     * @param elem
     * @return {boolean}
     */
    sameElem(elem) {
        return this.firstC.id === elem.id;
    }

    /**
     * Add child to field block.
     *
     * @param element
     */
    fieldAddChild(element) {
        document.getElementById('field').appendChild(element);
    }

    /**
     * Create separator.
     *
     * @return {HTMLBRElement}
     */
    getSeparator() {
        return document.createElement("br");
    }

    /**
     * Calculate progress.
     */
    updateProgress() {
        this.progress++;
        const percent = Math.round(100 / 81 * this.progress);
        var progressBar = this.getProgressBar();
        progressBar.style.width = percent + "%";
    }

    getProgressBar() {
        return document.getElementById("progress-bar");
    }

    /**
     * Generate array for field.
     *
     * Numbers from 1 to 99, numbers with 0 like 10,20 etc. skipped, numbers with two digits spited
     * and displayed as new array value.
     *
     * @return {*[]}
     */
    generateNumberArray() {
        const result = [];

        for (let i = 1; i <= 99; i++) {
            // Skip numbers with 0
            if (i % 10 !== 0) {
                // Separate two-digit numbers
                if (i >= 10) {
                    const digits = String(i).split('').map(Number);
                    result.push(...digits);
                } else {
                    result.push(i);
                }
            }
        }

        return result;
    }
}

/**
 * Run game application.
 *
 * @type {NumbrellaGame}
 */
const numbrellaGame = new NumbrellaGame();
