# Generated by Django 4.0.3 on 2022-03-26 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kyc', '0004_alter_kyc_data_dob'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kyc_data',
            name='dob',
            field=models.DateField(),
        ),
    ]
