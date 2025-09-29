from rest_framework import serializers
from .models import Transfer, Status, Mark, Category


from rest_framework import serializers
from .models import Transfer, Status, Mark, Category


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ["id", "name"]


class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ["id", "name"]


class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "parent"]


class TransferSerializer(serializers.ModelSerializer):
    status = StatusSerializer()
    mark = MarkSerializer()
    cat = CategorySerializer(source="categories", many=True)
    sum = serializers.DecimalField(source="amount", max_digits=12, decimal_places=2)

    class Meta:
        model = Transfer
        fields = [
            "id",
            "created",
            "status",
            "sum",
            "mark",
            "cat",
            "comment",
        ]
