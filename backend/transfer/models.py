from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    # created = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    created = models.DateTimeField(default=timezone.now, verbose_name="Дата создания")
    updated = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    class Meta:
        abstract = True


class Transfer(BaseModel):
    amount = models.DecimalField(
        max_digits=12, decimal_places=2, verbose_name="Сумма перевода", default=0
    )
    status = models.ForeignKey(
        "Status", on_delete=models.CASCADE, related_name="transfers"
    )
    mark = models.ForeignKey("Mark", on_delete=models.CASCADE, related_name="transfers")
    categories = models.ManyToManyField("Category")
    comment = models.TextField(null=True, blank=True, verbose_name="Комментарий")

    class Meta:
        verbose_name = "Перевод"
        verbose_name_plural = "Переводы"


class Status(BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name="Имя")

    class Meta:
        verbose_name = "Статус"
        verbose_name_plural = "Статусы"


class Mark(BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name="Имя")

    class Meta:
        verbose_name = "Тип/метка"
        verbose_name_plural = "Метки (типы)"


class Category(BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name="Имя")
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children",
        verbose_name="Родительская категория",
    )

    def __str__(self):
        return self.name or f"Категория {self.id}"
