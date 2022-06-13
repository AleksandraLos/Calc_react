function calculateMonthlyCost(loanAmount, repaymentYears, interest) {
    var months = repaymentYears * 12;

    return Math.round(loanAmount * (interest / 100) / 12 / (1 - Math.pow(1 + (interest / 100) / 12, (months * -1))));
}

var app = new Vue({
    'element': '#app',
    methods: {
        /**
         * Simulates an API call to a CMS.
         */
        getContent() {
            return {
                "monthlyCostLabel": "Månadskostnad",
                "monthlyCostSuffix": "kr",
                "loanAmountLabel": "Lånebelopp",
                "loanAmountSuffix": "kr",
                "repaymentYearsLabel": "Återbetalningstid",
                "repaymentYearsSuffix": "år",
                "ctaLabel": "Ansök nu",
                "interest": 5.77
            };
        }
    }
});