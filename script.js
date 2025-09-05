// Global variables for matching exercise
        let selectedVerb = null;
        let matches = [];

        // Check if user answer matches any of the correct answers (separated by slash)
        function isAnswerCorrect(userAnswer, correctAnswers) {
            const normalizedUser = userAnswer.trim().toLowerCase();
            const answerOptions = correctAnswers.toLowerCase().split('/');
            return answerOptions.some(answer => answer.trim() === normalizedUser);
        }

        // Check answers function
        function checkAnswers(buttonElement) {
            const exerciseCard = buttonElement.closest('.eng-exercise-card');
            
            // Check if this is matching exercise
            if (exerciseCard.dataset.exercise === '9') {
                checkMatchingAnswers(exerciseCard);
                return;
            }
            
            // Check if this is dropdown exercise (Exercise 1 or 8)
            if (exerciseCard.dataset.exercise === '1' || exerciseCard.dataset.exercise === '8') {
                checkDropdownAnswers(exerciseCard);
                return;
            }
            
            const blanks = exerciseCard.querySelectorAll('.eng-blank');
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            
            let score = 0;
            let total = blanks.length;
            
            blanks.forEach(blank => {
                const userAnswer = blank.value.trim();
                const correctAnswer = blank.dataset.answer;
                
                if (isAnswerCorrect(userAnswer, correctAnswer)) {
                    blank.classList.remove('incorrect');
                    blank.classList.add('correct');
                    score++;
                } else {
                    blank.classList.remove('correct');
                    blank.classList.add('incorrect');
                }
            });
            
            const percentage = Math.round((score / total) * 100);
            let message = `Score: ${score}/${total} (${percentage}%)`;
            
            scoreDisplay.className = 'eng-score-display show';
            
            if (percentage >= 80) {
                scoreDisplay.classList.add('good');
                message += ' - Excellent! 🎉';
            } else if (percentage >= 60) {
                scoreDisplay.classList.add('average');
                message += ' - Good job! 👍';
            } else {
                scoreDisplay.classList.add('poor');
                message += ' - Keep practicing! 💪';
            }
            
            scoreDisplay.textContent = message;
        }

        // Check dropdown answers function
        function checkDropdownAnswers(exerciseCard) {
            const dropdowns = exerciseCard.querySelectorAll('.eng-dropdown');
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            
            let score = 0;
            let total = dropdowns.length;
            
            dropdowns.forEach(dropdown => {
                const userAnswer = dropdown.value.trim();
                const correctAnswer = dropdown.dataset.answer;
                
                if (isAnswerCorrect(userAnswer, correctAnswer)) {
                    dropdown.classList.remove('incorrect');
                    dropdown.classList.add('correct');
                    score++;
                } else {
                    dropdown.classList.remove('correct');
                    dropdown.classList.add('incorrect');
                }
            });
            
            const percentage = Math.round((score / total) * 100);
            let message = `Score: ${score}/${total} (${percentage}%)`;
            
            scoreDisplay.className = 'eng-score-display show';
            
            if (percentage >= 80) {
                scoreDisplay.classList.add('good');
                message += ' - Excellent! 🎉';
            } else if (percentage >= 60) {
                scoreDisplay.classList.add('average');
                message += ' - Good job! 👍';
            } else {
                scoreDisplay.classList.add('poor');
                message += ' - Keep practicing! 💪';
            }
            
            scoreDisplay.textContent = message;
        }

        // Show answers function
        function showAnswers(buttonElement) {
            const exerciseCard = buttonElement.closest('.eng-exercise-card');
            
            // Check if this is matching exercise
            if (exerciseCard.dataset.exercise === '9') {
                showMatchingAnswers(exerciseCard);
                return;
            }
            
            // Check if this is dropdown exercise (Exercise 1 or 8)
            if (exerciseCard.dataset.exercise === '1' || exerciseCard.dataset.exercise === '8') {
                showDropdownAnswers(exerciseCard);
                return;
            }
            
            const blanks = exerciseCard.querySelectorAll('.eng-blank');
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            
            blanks.forEach(blank => {
                const correctAnswer = blank.dataset.answer;
                // Show first correct answer if multiple options exist
                const firstAnswer = correctAnswer.split('/')[0];
                blank.value = firstAnswer;
                blank.classList.remove('incorrect');
                blank.classList.add('correct');
                
                // Auto-resize the blank
                const minWidth = parseInt(blank.dataset.length) * 10 + 20;
                const contentWidth = firstAnswer.length * 12 + 20;
                blank.style.width = Math.max(minWidth, contentWidth) + 'px';
            });
            
            scoreDisplay.className = 'eng-score-display show good';
            scoreDisplay.textContent = `All answers revealed! 📖`;
        }

        // Show dropdown answers function
        function showDropdownAnswers(exerciseCard) {
            const dropdowns = exerciseCard.querySelectorAll('.eng-dropdown');
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            
            dropdowns.forEach(dropdown => {
                const correctAnswer = dropdown.dataset.answer;
                // Show first correct answer if multiple options exist
                const firstAnswer = correctAnswer.split('/')[0];
                dropdown.value = firstAnswer;
                dropdown.classList.remove('incorrect');
                dropdown.classList.add('correct');
            });
            
            scoreDisplay.className = 'eng-score-display show good';
            scoreDisplay.textContent = 'All answers revealed! 📖';
        }

        // Reset exercise function
        function resetExercise(buttonElement) {
            const exerciseCard = buttonElement.closest('.eng-exercise-card');
            
            // Check if this is matching exercise
            if (exerciseCard.dataset.exercise === '9') {
                resetMatchingExercise(exerciseCard);
                return;
            }
            
            // Check if this is dropdown exercise (Exercise 1 or 8)
            if (exerciseCard.dataset.exercise === '1' || exerciseCard.dataset.exercise === '8') {
                resetDropdownExercise(exerciseCard);
                return;
            }
            
            const blanks = exerciseCard.querySelectorAll('.eng-blank');
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            
            blanks.forEach(blank => {
                blank.value = '';
                blank.classList.remove('correct', 'incorrect');
                // Reset width to original size
                const length = parseInt(blank.dataset.length);
                blank.style.width = (length * 10 + 20) + 'px';
            });
            
            scoreDisplay.classList.remove('show', 'good', 'average', 'poor');
            scoreDisplay.textContent = '';
        }

        // Reset dropdown exercise function
        function resetDropdownExercise(exerciseCard) {
            const dropdowns = exerciseCard.querySelectorAll('.eng-dropdown');
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            
            dropdowns.forEach(dropdown => {
                dropdown.selectedIndex = 0; // Reset to first option ("-- Choose --" or "-- Select --")
                dropdown.classList.remove('correct', 'incorrect');
            });
            
            scoreDisplay.classList.remove('show', 'good', 'average', 'poor');
            scoreDisplay.textContent = '';
        }

        // Matching exercise functionality
        function handleMatchingClick(element) {
            const exerciseCard = element.closest('.eng-exercise-card');
            
            if (element.classList.contains('eng-verb')) {
                // Clicking on a verb
                if (element.classList.contains('matched')) return;
                
                // Remove previous selection
                exerciseCard.querySelectorAll('.eng-verb').forEach(verb => {
                    verb.classList.remove('selected');
                });
                
                // Select this verb
                element.classList.add('selected');
                selectedVerb = element;
            } else if (element.classList.contains('eng-past')) {
                // Clicking on a past form
                if (element.classList.contains('matched')) return;
                
                if (selectedVerb) {
                    const verbText = selectedVerb.textContent;
                    const pastText = element.textContent;
                    const correctAnswer = selectedVerb.dataset.answer;
                    
                    if (pastText === correctAnswer) {
                        // Correct match
                        selectedVerb.classList.remove('selected');
                        selectedVerb.classList.add('matched');
                        element.classList.add('matched');
                        
                        // Add to matches array
                        matches.push({
                            verb: verbText,
                            past: pastText,
                            correct: true
                        });
                        
                        // Display the match
                        displayMatch(exerciseCard, verbText, pastText, true);
                        
                        selectedVerb = null;
                    } else {
                        // Incorrect match
                        element.classList.add('incorrect');
                        selectedVerb.classList.add('incorrect');
                        
                        // Add to matches array
                        matches.push({
                            verb: verbText,
                            past: pastText,
                            correct: false
                        });
                        
                        // Display the match
                        displayMatch(exerciseCard, verbText, pastText, false);
                        
                        // Remove incorrect styling after animation
                        setTimeout(() => {
                            element.classList.remove('incorrect');
                            selectedVerb.classList.remove('incorrect', 'selected');
                            selectedVerb = null;
                        }, 1000);
                    }
                }
            }
        }

        function displayMatch(exerciseCard, verb, past, isCorrect) {
            const matchesList = exerciseCard.querySelector('.eng-matches-list');
            const matchPair = document.createElement('div');
            matchPair.className = `eng-match-pair ${isCorrect ? 'correct' : 'incorrect'}`;
            
            matchPair.innerHTML = `
                <span>${verb}</span>
                <span class="eng-match-arrow">→</span>
                <span>${past}</span>
                ${isCorrect ? '<span style="color: #48bb78;">✓</span>' : '<span style="color: #f56565;">✗</span>'}
            `;
            
            matchesList.appendChild(matchPair);
        }

        function checkMatchingAnswers(exerciseCard) {
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            const totalVerbs = exerciseCard.querySelectorAll('.eng-verb').length;
            const correctMatches = matches.filter(match => match.correct).length;
            
            const percentage = Math.round((correctMatches / totalVerbs) * 100);
            let message = `Score: ${correctMatches}/${totalVerbs} (${percentage}%)`;
            
            scoreDisplay.className = 'eng-score-display show';
            
            if (percentage >= 80) {
                scoreDisplay.classList.add('good');
                message += ' - Excellent! 🎉';
            } else if (percentage >= 60) {
                scoreDisplay.classList.add('average');
                message += ' - Good job! 👍';
            } else {
                scoreDisplay.classList.add('poor');
                message += ' - Keep practicing! 💪';
            }
            
            scoreDisplay.textContent = message;
        }

        function showMatchingAnswers(exerciseCard) {
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            const verbs = exerciseCard.querySelectorAll('.eng-verb');
            const pasts = exerciseCard.querySelectorAll('.eng-past');
            
            // Clear existing matches
            resetMatchingExercise(exerciseCard);
            
            // Auto-match all correctly
            verbs.forEach(verb => {
                const correctAnswer = verb.dataset.answer;
                const matchingPast = Array.from(pasts).find(past => past.dataset.past === correctAnswer);
                
                if (matchingPast) {
                    verb.classList.add('matched');
                    matchingPast.classList.add('matched');
                    
                    matches.push({
                        verb: verb.textContent,
                        past: matchingPast.textContent,
                        correct: true
                    });
                    
                    displayMatch(exerciseCard, verb.textContent, matchingPast.textContent, true);
                }
            });
            
            scoreDisplay.className = 'eng-score-display show good';
            scoreDisplay.textContent = 'All answers revealed! 📖';
        }

        function resetMatchingExercise(exerciseCard) {
            // Reset all visual states
            exerciseCard.querySelectorAll('.eng-match-item').forEach(item => {
                item.classList.remove('selected', 'matched', 'incorrect');
            });
            
            // Clear matches display
            const matchesList = exerciseCard.querySelector('.eng-matches-list');
            matchesList.innerHTML = '';
            
            // Reset variables
            selectedVerb = null;
            matches = [];
            
            // Reset score display
            const scoreDisplay = exerciseCard.querySelector('.eng-score-display');
            scoreDisplay.classList.remove('show', 'good', 'average', 'poor');
            scoreDisplay.textContent = '';
        }

        // Auto-resize blanks based on content
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('eng-blank')) {
                const minWidth = parseInt(e.target.dataset.length) * 10 + 20;
                const contentWidth = e.target.value.length * 12 + 20;
                e.target.style.width = Math.max(minWidth, contentWidth) + 'px';
            }
        });

        // Event listener for word bank and matching clicks
        document.addEventListener('click', function(e) {
            // Handle matching exercise clicks
            if (e.target.classList.contains('eng-match-item')) {
                handleMatchingClick(e.target);
                return;
            }
            
            // Handle regular word bank clicks
            if (e.target.classList.contains('eng-word')) {
                const word = e.target.textContent;
                const exerciseCard = e.target.closest('.eng-exercise-card');
                
                // Skip if this is matching exercise or dropdown exercises
                if (exerciseCard.dataset.exercise === '9' || 
                    exerciseCard.dataset.exercise === '1' || 
                    exerciseCard.dataset.exercise === '8') return;
                
                const blanks = exerciseCard.querySelectorAll('.eng-blank');
                
                // Try to find focused blank first
                let targetBlank = exerciseCard.querySelector('.eng-blank:focus');
                
                // If no focused blank, find first empty blank
                if (!targetBlank) {
                    targetBlank = Array.from(blanks).find(blank => blank.value.trim() === '');
                }
                
                if (targetBlank) {
                    targetBlank.value = word;
                    targetBlank.focus();
                    
                    // Auto-resize the blank
                    const minWidth = parseInt(targetBlank.dataset.length) * 10 + 20;
                    const contentWidth = word.length * 12 + 20;
                    targetBlank.style.width = Math.max(minWidth, contentWidth) + 'px';
                }
            }
        });

        // Initialize blank widths on page load
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.eng-blank').forEach(blank => {
                const length = parseInt(blank.dataset.length);
                blank.style.width = (length * 10 + 20) + 'px';
            });
        });

        // Keyboard navigation enhancement
        document.addEventListener('keydown', function(e) {
            if (e.target.classList.contains('eng-blank')) {
                if (e.key === 'Enter' || e.key === 'Tab') {
                    const exerciseCard = e.target.closest('.eng-exercise-card');
                    const blanks = Array.from(exerciseCard.querySelectorAll('.eng-blank'));
                    const currentIndex = blanks.indexOf(e.target);
                    
                    if (e.key === 'Enter' && currentIndex < blanks.length - 1) {
                        e.preventDefault();
                        blanks[currentIndex + 1].focus();
                    }
                }
            }
        });
