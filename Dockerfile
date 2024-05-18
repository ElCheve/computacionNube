FROM python:3
WORKDIR /app
# Copia los archivos de requerimientos al directorio de trabajo
COPY requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación correrá
EXPOSE 8000
CMD ["python", "./main.py"]