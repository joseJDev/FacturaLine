# Generated by Django 3.2.9 on 2021-11-14 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('factura', '0004_product_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='factureline',
            name='discount',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='code',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]