from django.db import models

class BioSample(models.Model):
    TYPE_CHOICES = [
        ('water', 'Water'),
        ('chocolate', 'Chocolate'),
        ('flour', 'Flour'),
        ('other', 'Other'),
    ]
    
    sampling_location = models.CharField(max_length=255)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)
    sampling_date = models.DateField()
    sampling_operator = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.type} sample - {self.sampling_date}"

class Comment(models.Model):
    biosample = models.ForeignKey(BioSample, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField()
    
    def __str__(self):
        return f"Comment - {self.biosample}"