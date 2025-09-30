from rest_framework import generics
from .models import Transfer, Status, Mark, Category
from .serializers import (
    TransferSerializer,
    StatusSerializer,
    MarkSerializer,
    CategorySerializer,
)
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.utils.dateparse import parse_datetime
from django.utils import timezone

model_map = {
    "mark": Mark,
    "status": Status,
    "category": Category,
}


class TransferListView(generics.ListAPIView):

    def get(self, request):
        transfers = Transfer.objects.all()
        serializer = TransferSerializer(transfers, many=True)
        return Response(serializer.data)

    def post(self, request):
        # serializer = TransferSerializer(data=request.data)
        transfers = Transfer.objects.all()

        if "dates" in request.data:
            start_date_str = request.data["dates"][0]
            end_date_str = request.data["dates"][1]
            start_date = (
                datetime.fromisoformat(start_date_str) if start_date_str else None
            )
            end_date = datetime.fromisoformat(end_date_str) if end_date_str else None
            if end_date:
                end_date = end_date + timedelta(days=1)

            if start_date and end_date:
                transfers = transfers.filter(
                    created__gte=start_date, created__lte=end_date
                )
            elif start_date:
                transfers = transfers.filter(created__gte=start_date)
            elif end_date:
                transfers = transfers.filter(created__lte=end_date)

        if "marks" in request.data and 0 < len(request.data["marks"]):
            transfers = transfers.filter(mark_id__in=request.data["marks"])

        if "statuses" in request.data and 0 < len(request.data["statuses"]):
            transfers = transfers.filter(status_id__in=request.data["statuses"])

        if "categories" in request.data and 0 < len(request.data["categories"]):
            all_category_ids = []

            for cat_id in request.data["categories"]:
                cat_id = int(cat_id)  # приводим к int
                all_category_ids.append(cat_id)
                cat = Category.objects.filter(id=cat_id).first()
                if cat:
                    children_ids = list(cat.children.values_list("id", flat=True))
                    all_category_ids.extend(children_ids)

            transfers = transfers.filter(categories__id__in=all_category_ids).distinct()

        if "sort_by_sum" in request.data and request.data["sort_by_sum"]:
            transfers = transfers.order_by("amount")

        if "sort_by_date" in request.data and request.data["sort_by_date"]:
            transfers = transfers.order_by("created")

        if "is_reverse" in request.data and request.data["is_reverse"]:
            transfers = transfers.reverse()

        serializer = TransferSerializer(transfers, many=True)
        return Response(serializer.data)


class StatusListView(generics.ListAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


class MarkListView(generics.ListAPIView):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TransferUpdateView(APIView):
    def put(self, request, pk):
        print(request.data)
        transfer = get_object_or_404(Transfer, pk=pk)
        data = request.data

        if "sum" in data:
            transfer.amount = data["sum"]

        if "comment" in data:
            transfer.comment = data["comment"]

        if "mark" in data:
            mark_id = data["mark"]["id"]
            if mark_id < 0:  # новый mark
                new_mark = Mark.objects.create(name=data["mark"]["name"])
                transfer.mark = new_mark
            else:
                transfer.mark = get_object_or_404(Mark, pk=mark_id)

        if "status" in data:
            status_id = data["status"]["id"]
            if status_id < 0:  # новый статус
                new_status = Status.objects.create(name=data["status"]["name"])
                transfer.status = new_status
            else:
                transfer.status = get_object_or_404(Status, pk=status_id)

        if "created" in data and data["created"]:
            transfer.created = parse_datetime(data["created"])

        if "cat" in data:
            categories = []
            for cat in data["cat"]:
                cat_id = cat["id"]
                if cat_id < 0:  # новая категория
                    new_cat = Category.objects.create(name=cat["name"])
                    categories.append(new_cat)
                else:
                    categories.append(get_object_or_404(Category, pk=cat_id))

            transfer.categories.set(categories)

        # if "created" in data:

        transfer.save()

        serializer = TransferSerializer(transfer)
        return Response(serializer.data)


class TransferCreateView(APIView):
    def post(self, request):
        data = request.data

        status_data = data.get("status")
        if status_data:
            if status_data["id"] < 0:
                status_obj = Status.objects.create(name=status_data["name"])
            else:
                status_obj = get_object_or_404(Status, id=status_data["id"])
        else:
            return Response({"error": "status is required"}, status=400)

        mark_data = data.get("mark")
        if mark_data:
            if mark_data["id"] < 0:
                mark_obj = Mark.objects.create(name=mark_data["name"])
            else:
                mark_obj = get_object_or_404(Mark, id=mark_data["id"])
        else:
            return Response({"error": "mark is required"}, status=400)

        created = timezone.now()
        if "created" in data and data["created"]:
            created = parse_datetime(data["created"])

        transfer = Transfer.objects.create(
            amount=data.get("sum", 0),
            status=status_obj,
            mark=mark_obj,
            comment=data.get("comment", ""),
            created=created if created else None,
        )

        cat_objs = []
        for cat_data in data.get("cat", []):
            if cat_data["id"] < 0:
                parent = None
                if cat_data.get("parent"):
                    parent = Category.objects.filter(id=cat_data["parent"]).first()
                cat = Category.objects.create(name=cat_data["name"], parent=parent)
                cat_objs.append(cat)
            else:
                cat = Category.objects.filter(id=cat_data["id"]).first()
                if cat:
                    cat_objs.append(cat)

        transfer.categories.set(cat_objs)

        serializer = TransferSerializer(transfer)
        return Response(serializer.data, status=201)


class TransferDeleteView(APIView):
    def delete(self, request, transfer_id):
        transfer = get_object_or_404(Transfer, id=transfer_id)
        transfer.delete()
        return Response(status=204)


class AddFilterView(APIView):
    def post(self, request):
        print(request.data)
        name = request.data.get("name")
        t = request.data.get("t")

        if not name or not t:
            return Response({"error": "name and t are required"}, status=400)

        Model = model_map.get(t)
        if not Model:
            return Response({"error": f"Unknown filter type: {t}"}, status=400)

        # создаются разные объекты в зависимости от t
        if t == "category":
            parent_id = request.data.get("p")
            parent = None
            if parent_id:
                parent = Category.objects.filter(id=parent_id).first()
                if not parent:
                    return Response(
                        {"error": f"Parent category {parent_id} not found"}, status=400
                    )

            obj = Category.objects.create(name=name, parent=parent)
        else:
            obj = Model.objects.create(name=name)

        return Response(
            {
                "id": obj.id,
                "name": obj.name,
                "t": t,
                "parent": obj.parent.id if t == "category" and obj.parent else None,
            },
            status=201,
        )


class FilterDeleteView(APIView):
    def delete(self, request, filter_type, pk):

        model = model_map.get(filter_type)
        if not model:
            return Response(
                {"error": f"Unsupported filter type: {filter_type}"},
                status=400,
            )

        obj = get_object_or_404(model, pk=pk)

        # Для категории: удалится и все дети (children) благодаря on_delete=models.CASCADE
        obj.delete()

        return Response({"message": f"{filter_type} {pk} deleted"}, status=200)


class FilterUpdateView(APIView):
    def post(self, request):
        filter_id = request.data.get("id")
        name = request.data.get("name")
        filter_type = request.data.get("t")

        if not filter_id or not name or not filter_type:
            return Response(
                {"error": "id, name и t обязательны"},
                status=400,
            )

        model = model_map.get(filter_type)
        if not model:
            return Response(
                {"error": f"Unsupported filter type: {filter_type}"},
                status=400,
            )

        obj = get_object_or_404(model, pk=filter_id)
        obj.name = name
        obj.save()

        return Response(
            {
                "message": f"{filter_type} {filter_id} updated",
                "id": obj.id,
                "name": obj.name,
            },
            status=200,
        )
