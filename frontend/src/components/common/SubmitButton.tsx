import { Button } from "../ui/button";

export default function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <Button type="submit" className="w-full px-8" disabled={pending}>
            {pending ? "Creando..." : "Crear Evento"}
        </Button>
    )
}