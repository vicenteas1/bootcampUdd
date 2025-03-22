# bootcampUdd

Repositorio para adjuntar ejercicios y retos semanales de bootcamp UDD Desarrollador FullStack COHORTE 19


# Comando para crear carpetas del 1 al 28 por semana
for i in {1..28}
do
    carpeta="semana$i"
    if [ ! -d "$carpeta" ]; then
        mkdir "$carpeta"
        touch "$carpeta/.gitkeep"
        echo "Carpeta creada: $carpeta (con .gitkeep)"
    else
        echo "Ya existe: $carpeta"
    fi
done
