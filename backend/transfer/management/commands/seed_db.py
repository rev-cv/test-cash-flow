import random
from django.core.management.base import BaseCommand
from faker import Faker
from transfer.models import Transfer, Status, Mark, Category
from django.utils import timezone


fake = Faker("ru_RU")


class Command(BaseCommand):
    help = "Очистка БД и заполнение тестовыми данными"

    def handle(self, *args, **kwargs):
        # Чистим все таблицы
        Transfer.objects.all().delete()
        Status.objects.all().delete()
        Mark.objects.all().delete()
        Category.objects.all().delete()

        self.stdout.write(self.style.WARNING("Все таблицы очищены."))

        # Создаём статусы
        statuses = []
        for name in ["Черновик", "Проведен", "Отклонен", "В обработке"]:
            s = Status.objects.create(name=name)
            statuses.append(s)
        self.stdout.write(self.style.SUCCESS(f"Создано {len(statuses)} статусов."))

        # Создаём метки
        marks = [
            Mark.objects.create(name="Пополнение"),
            Mark.objects.create(name="Списание"),
        ]
        self.stdout.write(self.style.SUCCESS("Созданы метки Пополнение и Списание."))

        # Создаём категории (50 штук, часть с родителями)
        categories = []
        for i in range(25):
            parent = Category.objects.create(name=fake.word().capitalize())
            categories.append(parent)
            for _ in range(2):  # по 2 подкатегории
                child = Category.objects.create(
                    name=fake.word().capitalize(), parent=parent
                )
                categories.append(child)

        self.stdout.write(self.style.SUCCESS(f"Создано {len(categories)} категорий."))

        # Создаём трансферы (50 штук)
        for _ in range(50):
            created_date = fake.date_time_between(
                start_date="-30d",
                end_date="now",
                tzinfo=timezone.get_current_timezone(),
            )

            transfer = Transfer.objects.create(
                amount=round(random.uniform(1000, 100000), 2),
                status=random.choice(statuses),
                mark=random.choice(marks),
                comment=fake.sentence(nb_words=6),
                created=created_date,
            )
            # добавим 1–3 категории
            transfer.categories.add(*random.sample(categories, random.randint(1, 3)))

            Transfer.objects.filter(pk=transfer.pk).update(
                created=created_date, updated=created_date
            )

        self.stdout.write(self.style.SUCCESS("Создано 50 трансферов."))
        self.stdout.write(self.style.SUCCESS("База готова к отладке."))
