import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
    interface TypographyVariants {
        h7: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        h7?: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        h7: true;
    }
}
