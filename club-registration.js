// club-registration.js - React Component for Club Registration
const { useState, useEffect } = React;

const ClubRegistrationModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState('');
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        studentEmail: '',
        studentPhone: '',
        studentYear: '',
        studentMajor: '',
        previousExperience: '',
        interests: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle join button clicks from anywhere on the page
    useEffect(() => {
        const handleJoinClick = (event) => {
            if (event.target.classList.contains('join-club-btn')) {
                const clubCard = event.target.closest('.club-detailed-card');
                if (clubCard) {
                    const clubName = clubCard.querySelector('h3').textContent;
                    setSelectedClub(clubName);
                    setIsOpen(true);
                    setIsSubmitted(false);
                    console.log('Opening registration for:', clubName);
                }
            }
        };

        document.addEventListener('click', handleJoinClick);
        
        return () => {
            document.removeEventListener('click', handleJoinClick);
        };
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.studentName.trim()) {
            newErrors.studentName = 'Full name is required';
        }
        
        if (!formData.studentId.trim()) {
            newErrors.studentId = 'Student ID is required';
        }
        
        if (!formData.studentEmail.trim()) {
            newErrors.studentEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
            newErrors.studentEmail = 'Please enter a valid email address';
        }
        
        if (!formData.studentYear) {
            newErrors.studentYear = 'Please select your year of study';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitting(true);
            
            // Simulate API call/processing
            setTimeout(() => {
                console.log('Form submitted successfully:', {
                    club: selectedClub,
                    ...formData
                });
                
                setIsSubmitting(false);
                setIsSubmitted(true);
                
                // Reset form after success
                setTimeout(() => {
                    setFormData({
                        studentName: '',
                        studentId: '',
                        studentEmail: '',
                        studentPhone: '',
                        studentYear: '',
                        studentMajor: '',
                        previousExperience: '',
                        interests: ''
                    });
                    setIsOpen(false);
                    setIsSubmitted(false);
                }, 3000);
            }, 2000);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setErrors({});
    };

    // Don't render anything if modal is closed
    if (!isOpen) return null;

    // Success message view
    if (isSubmitted) {
        return React.createElement('div', { 
            className: 'modal-backdrop',
            onClick: (e) => e.target.className === 'modal-backdrop' && closeModal()
        }, 
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { 
                    style: { 
                        textAlign: 'center', 
                        padding: '2rem',
                        color: 'var(--primary)'
                    } 
                },
                    React.createElement('i', { 
                        className: 'fas fa-check-circle',
                        style: { 
                            fontSize: '4rem', 
                            color: 'var(--accent)',
                            marginBottom: '1rem'
                        } 
                    }),
                    React.createElement('h2', { 
                        style: { marginBottom: '1rem' }
                    }, 'Registration Successful!'),
                    React.createElement('p', { 
                        style: { 
                            color: 'var(--gray)',
                            lineHeight: '1.6',
                            marginBottom: '0.5rem'
                        } 
                    }, `Thank you ${formData.studentName}!`),
                    React.createElement('p', { 
                        style: { 
                            color: 'var(--gray)',
                            lineHeight: '1.6'
                        } 
                    }, `You have successfully registered for the ${selectedClub}.`),
                    React.createElement('p', { 
                        style: { 
                            color: 'var(--gray)',
                            fontSize: '0.9rem',
                            marginTop: '1rem'
                        } 
                    }, 'We will contact you at ' + formData.studentEmail + ' with more details.')
                )
            )
        );
    }

    // Main registration form view
    return React.createElement('div', { 
        className: 'modal-backdrop',
        onClick: (e) => e.target.className === 'modal-backdrop' && closeModal()
    }, 
        React.createElement('div', { className: 'modal-content' },
            React.createElement('button', { 
                className: 'modal-close',
                onClick: closeModal,
                type: 'button'
            }, React.createElement('i', { className: 'fas fa-times' })),
            
            React.createElement('div', { className: 'form-header' },
                React.createElement('h2', null, 'Club Registration'),
                React.createElement('p', null, `Join the ${selectedClub}`)
            ),
            
            React.createElement('form', { onSubmit: handleSubmit, className: 'registration-form' },
                React.createElement('div', { className: 'form-row' },
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'studentName' }, 'Full Name *'),
                        React.createElement('input', {
                            type: 'text',
                            id: 'studentName',
                            name: 'studentName',
                            value: formData.studentName,
                            onChange: handleInputChange,
                            className: errors.studentName ? 'error' : '',
                            placeholder: 'Enter your full name',
                            required: true
                        }),
                        errors.studentName && React.createElement('span', { className: 'error-message' }, errors.studentName)
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'studentId' }, 'Student ID *'),
                        React.createElement('input', {
                            type: 'text',
                            id: 'studentId',
                            name: 'studentId',
                            value: formData.studentId,
                            onChange: handleInputChange,
                            className: errors.studentId ? 'error' : '',
                            placeholder: 'Enter your student ID',
                            required: true
                        }),
                        errors.studentId && React.createElement('span', { className: 'error-message' }, errors.studentId)
                    )
                ),
                
                React.createElement('div', { className: 'form-row' },
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'studentEmail' }, 'Email Address *'),
                        React.createElement('input', {
                            type: 'email',
                            id: 'studentEmail',
                            name: 'studentEmail',
                            value: formData.studentEmail,
                            onChange: handleInputChange,
                            className: errors.studentEmail ? 'error' : '',
                            placeholder: 'your.email@university.edu',
                            required: true
                        }),
                        errors.studentEmail && React.createElement('span', { className: 'error-message' }, errors.studentEmail)
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'studentPhone' }, 'Phone Number'),
                        React.createElement('input', {
                            type: 'tel',
                            id: 'studentPhone',
                            name: 'studentPhone',
                            value: formData.studentPhone,
                            onChange: handleInputChange,
                            placeholder: '(+266) '
                        })
                    )
                ),
                
                React.createElement('div', { className: 'form-row' },
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'studentYear' }, 'Year of Study *'),
                        React.createElement('select', {
                            id: 'studentYear',
                            name: 'studentYear',
                            value: formData.studentYear,
                            onChange: handleInputChange,
                            className: errors.studentYear ? 'error' : '',
                            required: true
                        },
                            React.createElement('option', { value: '' }, 'Select your year'),
                            React.createElement('option', { value: 'freshman' }, 'Freshman'),
                            React.createElement('option', { value: 'sophomore' }, 'Sophomore'),
                            React.createElement('option', { value: 'junior' }, 'Junior'),
                            React.createElement('option', { value: 'senior' }, 'Senior'),
                            React.createElement('option', { value: 'graduate' }, 'Graduate')
                        ),
                        errors.studentYear && React.createElement('span', { className: 'error-message' }, errors.studentYear)
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'studentMajor' }, 'Major/Program'),
                        React.createElement('input', {
                            type: 'text',
                            id: 'studentMajor',
                            name: 'studentMajor',
                            value: formData.studentMajor,
                            onChange: handleInputChange,
                            placeholder: 'Your field of study'
                        })
                    )
                ),
                
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', { htmlFor: 'selectedClub' }, 'Selected Club'),
                    React.createElement('input', {
                        type: 'text',
                        id: 'selectedClub',
                        value: selectedClub,
                        readOnly: true,
                        style: { background: 'var(--light)', cursor: 'not-allowed' }
                    })
                ),
                
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', { htmlFor: 'interests' }, 'Why are you interested in this club?'),
                    React.createElement('textarea', {
                        id: 'interests',
                        name: 'interests',
                        value: formData.interests,
                        onChange: handleInputChange,
                        placeholder: 'Tell us what excites you about this club and what you hope to gain from joining...',
                        rows: 3
                    })
                ),
                
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', { htmlFor: 'previousExperience' }, 'Previous Experience (Optional)'),
                    React.createElement('textarea', {
                        id: 'previousExperience',
                        name: 'previousExperience',
                        value: formData.previousExperience,
                        onChange: handleInputChange,
                        placeholder: 'Any relevant experience or skills you have...',
                        rows: 2
                    })
                ),
                
                React.createElement('button', { 
                    type: 'submit',
                    className: `btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`,
                    disabled: isSubmitting,
                    style: { width: '100%', marginTop: '1rem' }
                }, 
                    isSubmitting ? 
                        React.createElement(React.Fragment, null,
                            React.createElement('i', { className: 'fas fa-spinner fa-spin' }),
                            ' Processing...'
                        ) :
                        React.createElement(React.Fragment, null,
                            React.createElement('i', { className: 'fas fa-user-plus' }),
                            ' Register for Club'
                        )
                )
            )
        )
    );
};

// Render the React component
const modalRoot = ReactDOM.createRoot(document.getElementById('react-modal-root'));
modalRoot.render(React.createElement(ClubRegistrationModal));