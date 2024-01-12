
export function generateDob(dob: string) {
    return dob.split("-").reverse().join("-")
}