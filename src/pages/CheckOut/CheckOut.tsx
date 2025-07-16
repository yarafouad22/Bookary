import {
  Typography,
  Input,
  Button,
  Sheet,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [instaPayNumber, setInstaPayNumber] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    location?: string;
    instaPayNumber?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Please enter a name";
    if (!location.trim()) newErrors.location = "Please enter a location";
    if (paymentMethod === "online" && !instaPayNumber.trim()) {
      newErrors.instaPayNumber = "Please enter a InstaPaynumber";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    alert(
      `Payment has been confirmed via: ${
        paymentMethod === "cash" ? "cash" : ` InstaPay (${instaPayNumber})`
      } `
    );
  };

  return (
    <div style={{ justifyItems: "center", width: "100%" }}>
      <Typography level="h3" gutterBottom>
        {t("checkout")}
      </Typography>

      <Sheet variant="outlined" sx={{ p: 3, maxWidth: 500 }}>
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.name}
        />
        {errors.name && <Typography color="danger">{errors.name}</Typography>}

        <Input
          placeholder="your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.location}
        />
        {errors.location && (
          <Typography color="danger">{errors.location}</Typography>
        )}

        <FormControl sx={{ mb: 2 }}>
          <FormLabel>pay with</FormLabel>
          <RadioGroup
            orientation="horizontal"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <Radio value="cash" label="cash" />
            <Radio value="online" label="online" />
          </RadioGroup>
        </FormControl>

        {paymentMethod === "online" && (
          <>
            <Input
              placeholder="instaPayNumber"
              value={instaPayNumber}
              onChange={(e) => setInstaPayNumber(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.instaPayNumber}
            />
            {errors.instaPayNumber && (
              <Typography color="danger">{errors.instaPayNumber}</Typography>
            )}
          </>
        )}

        <Button fullWidth onClick={handleSubmit}>
          {t("place order")}
        </Button>
      </Sheet>
    </div>
  );
}
