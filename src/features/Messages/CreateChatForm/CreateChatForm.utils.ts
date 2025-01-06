export const muiInputStyles = {
    "& .MuiAutocomplete-popper": {
        backgroundColor: '#222',
    },
    "& .MuiAutocomplete-input": {
      color: "#fff",
      borderColor: "#fff",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#303030",
            color: "#fff",
        },
        "&:hover fieldset": {
            borderColor: "#fcc521", // Цвет рамки при наведении
        },
        "&.Mui-focused fieldset": {
            borderColor: "#fcc521",
            color: "#fff",
        },
    },
    color: "#fff",
    '&.Mui-focused': {
    color: '#fcc521', // Цвет при фокусе
    },
}