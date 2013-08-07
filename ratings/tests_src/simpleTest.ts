/// <reference path="tsUnit.ts" />

var testClass = new tsUnit.TestClass();

function addTwoNumbersWith1And2Expect3() {
    var result = 1 + 2;

    testClass.areIdentical(3, result);
}

function addTwoNumbersWith3And2Expect5() {
    var result = 5 + 2;

    testClass.areIdentical(5, result);
}