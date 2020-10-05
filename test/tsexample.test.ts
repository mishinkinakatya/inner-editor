import {expect} from "chai";

const sum = (a: string, b: string): number => {
    return Number(a) + Number(b);
}

describe("Sum of two strings. TS", () => {
    it('First TS test', () => {
        expect (sum("1","2")).to.equal(3)
    })
})