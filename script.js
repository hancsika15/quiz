document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quiz-form");
    const submitBtn = document.getElementById("submit-btn");
    const progressbar = document.getElementById("progress-bar");
    const resultDiv = document.getElementById("result");
    const scoreDisplay = document.getElementById("score");

    const correctAnswers = [1, 2, 1, 2, 1, 1, 0, 1, 2, 1, 2, 0, 1, 2, 1, 2];

    /*
    // Automatikus kitöltés teszteléshez
    correctAnswers.forEach((answer, index) => {
        const questionName = `q${index + 1}`;
        const options = form.elements[questionName];
        if (options) {
            options[answer].checked = true;
        }
    });*/

    const totalQuestions = correctAnswers.length;
    let answeredQuestions = 0;

    // Set initial progress bar to 0%
    progressbar.style.width = `0%`;
    progressbar.setAttribute("aria-valuenow", 0);
    progressbar.innerHTML = `0%`;
    submitBtn.disabled = true;

    // Function to update progress bar
    const updateProgress = () => {
        const selectedAnswers = new Set();
        correctAnswers.forEach((_, index) => {
            const questionName = `q${index + 1}`;
            const options = form.elements[questionName];
            if (options) {
                Array.from(options).forEach(option => {
                    if (option.checked) {
                        selectedAnswers.add(questionName);
                    }
                });
            }
        });

        answeredQuestions = selectedAnswers.size;
        const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
        progressbar.style.width = `${progressPercentage}%`;
        progressbar.setAttribute("aria-valuenow", progressPercentage);
        progressbar.innerHTML = `${progressPercentage}%`;
        submitBtn.disabled = answeredQuestions < totalQuestions;
    };

    form.addEventListener("change", updateProgress);

    // Quiz evaluation event handler
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let score = 0;

        correctAnswers.forEach((correctIndex, questionIndex) => {
            const questionName = `q${questionIndex + 1}`;
            const options = form.elements[questionName];
            let userAnswer = null;

            Array.from(options).forEach((option, optionIndex) => {
                if (option.checked) {
                    userAnswer = optionIndex;
                }
                if (optionIndex === correctIndex) {
                    option.parentElement.style.backgroundColor = "lightgreen";
                    option.parentElement.style.fontWeight = "bold";
                } else if (option.checked && optionIndex !== correctIndex) {
                    option.parentElement.style.backgroundColor = "lightcoral";
                    option.parentElement.style.fontWeight = "bold";
                } else {
                    option.parentElement.style.color = "black";
                    option.parentElement.style.fontWeight = "normal";
                }
            });

            if (userAnswer === correctIndex) {
                score++;
            }
        });

        resultDiv.style.display = "block";
        scoreDisplay.innerHTML = `Helyes válaszok: ${score} / ${totalQuestions}`;
    });
});
