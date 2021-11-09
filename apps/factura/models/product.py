# Django
from django.db import models

# Core
from core.base_model import FacturaModel

class Product(FacturaModel):
    name = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    value = models.IntegerField()

    class Meta:
        db_table = 'product'
        verbose_name = 'Productos'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self) -> str:
        return "{} - {}".format(
            self.name,
            self.value
        )