export const getInitials = (name)=>{
    if(!name){
        return ""
    }
    const words = name.split(" ");
    let initials = ""
    for (let index = 0; index < Math.min(words.length,2); index++) {
        initials += words[index][0]
        
    }
    return initials.toUpperCase()
}
export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}