import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <Alert>
      {"success" in message && (
        <AlertTitle className="text-foreground border-foreground px-4">
          {message.success}
        </AlertTitle>
      )}
      {"error" in message && (
        <AlertTitle className="text-destructive-foreground border-destructive-foreground px-4">
          {message.error}
        </AlertTitle>
      )}
      {"message" in message && (
        <AlertDescription className="text-foreground border-l-2 px-4">{message.message}</AlertDescription>
      )}
    </Alert>
  );
}
