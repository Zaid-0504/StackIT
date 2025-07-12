// globalStyles.js

const colors = {
  dark: "#1D1616", // Backgrounds, Text
  primary: "#8E1616", // Primary Button, Links
  accent: "#D84040", // Hover, Highlights
  light: "#EEEEEE", // Background, Inputs
}

const fonts = {
  regular: "System", // You can replace with 'Roboto', 'Poppins', etc.
  bold: "System",
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
}

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  pill: 999,
}

const globalStyles = {
  colors,
  fonts,
  spacing,
  borderRadius,

  // Common reusable style blocks
  containers: {
    screen: {
      flex: 1,
      backgroundColor: colors.light,
      padding: spacing.md,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: borderRadius.md,
      padding: spacing.md,
      shadowColor: colors.dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  },

  text: {
    heading: {
      fontSize: fonts.sizes.xl,
      fontWeight: "bold",
      color: colors.dark,
    },
    body: {
      fontSize: fonts.sizes.md,
      color: colors.dark,
    },
    caption: {
      fontSize: fonts.sizes.sm,
      color: colors.accent,
    },
  },

  buttons: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
    },
    primaryText: {
      color: "#fff",
      fontSize: fonts.sizes.md,
      fontWeight: "bold",
    },
  },
}

export default globalStyles
