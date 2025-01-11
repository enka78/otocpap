export function RiskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Risk Testi
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold">
            Uyku Apnesi Riski Tespit Edildi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Yaptığınız risk testi sonucunda uyku apnesi riski tespit edildi.
            Size en uygun tedavi yöntemini belirlemek için lütfen bizimle
            iletişime geçin.
          </p>

          <div className="space-y-2">
            <h3 className="font-medium">Belirtiler:</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Horlama</li>
              <li>Gündüz aşırı uyku hali</li>
              <li>Sabah baş ağrısı</li>
              <li>Konsantrasyon bozukluğu</li>
              <li>Uykuda nefes durması</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Önerilen Adımlar:</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Uyku testi yaptırın</li>
              <li>Doktor kontrolüne gidin</li>
              <li>Yaşam tarzı değişiklikleri yapın</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Kapat</Button>
            </DialogClose>
            <Button>İletişime Geç</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
