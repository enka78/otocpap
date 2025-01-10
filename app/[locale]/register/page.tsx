"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast({
        title: "Hata",
        description: "Şifreler eşleşmiyor.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Burada normalde API'ye istek atılacak
      // Şimdilik dummy register yapıyoruz
      dispatch(
        login({
          id: "1",
          name: name,
          email: email,
        })
      );

      toast({
        title: "Başarılı",
        description: "Hesabınız oluşturuldu.",
      });

      // Başarılı kayıttan sonra shop sayfasına yönlendir
      router.push("/shop");
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kayıt yapılamadı. Lütfen bilgilerinizi kontrol edin.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-md py-16">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Hesap Oluştur</h1>
          <p className="text-muted-foreground">
            Yeni bir hesap oluşturarak alışverişe başlayın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Ad Soyad"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@mail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Hesap Oluştur
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Zaten hesabınız var mı?
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Giriş Yap
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
