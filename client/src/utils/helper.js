export const getInitials = (name) => {
    if (!name || typeof name !== 'string') {
        return "";
    }

    // Split the name by spaces, filter out any empty strings caused by extra spaces
    const words = name.trim().split(/\s+/);

    if (words.length === 0) {
        return "";
    }

    // Take the first letter of the first two words
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i].charAt(0); // Ensure we're getting the first character
    }

    return initials.toUpperCase(); // Return the initials in uppercase
};

export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}