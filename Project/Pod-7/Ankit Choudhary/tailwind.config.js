/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            borderWidth: {
                primaryWidth: 1.5
            },
            borderRadius: {
                10: "10px",
                20: "20px",
                30: "30px",
                40: "40px",
                50: "50px",
            },
            padding: {
                10: "10px",
                15: "15px",
                20: "20px",
                25: "25px",
                30: "30px",
                35: "35px",
                40: "40px",
                45: "45px",
                50: "50px",
            },
            colors: {
                primaryBg: "#F8F7F1",
                primaryBlack: "#1A1A1A",
            },
            fontFamily: {
                primary: ["Poppins"],
                mammoth: ["Mammoth"],
                gotu: ["Gotu"]
            },
            backgroundImage: {
                primaryGradient: "linear-gradient(245.63deg, #FED54B 13.57%, #F5B2E6 46.99%, #8CEAFF 84.08%)",
                blackToTrans: "linear-gradient(180deg, rgba(26, 26, 26, 0.3) 0%, rgba(26, 26, 26, 0) 100%)",
            },
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp')
    ],
}