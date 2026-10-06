package com.permuta.ejemplo_mapper.djinn.seeder;

import com.permuta.ejemplo_mapper.djinn.dto.NewDjinnRequest;
import com.permuta.ejemplo_mapper.djinn.model.Element;
import com.permuta.ejemplo_mapper.djinn.model.Game;
import com.permuta.ejemplo_mapper.djinn.service.DjinnService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Carga djinn de ejemplo al arrancar la aplicación.
 * Los datos son orientativos: sirven para tener contenido con el que probar la API y la web.
 */
@Component
@RequiredArgsConstructor
public class DjinnSeeder implements CommandLineRunner {

    private final DjinnService service;

    @Override
    public void run(String... args) {
        List<NewDjinnRequest> djinn = List.of(
                new NewDjinnRequest("Flint", Element.VENUS, Game.GOLDEN_SUN, "Vale", "Ataque de tierra", 30),
                new NewDjinnRequest("Granite", Element.VENUS, Game.GOLDEN_SUN, "Vale", "Aumenta la defensa", 20),
                new NewDjinnRequest("Quartz", Element.VENUS, Game.GOLDEN_SUN, "Vale", "Cura al grupo", 25),
                new NewDjinnRequest("Forge", Element.MARS, Game.GOLDEN_SUN, "Vale", "Ataque de fuego", 35),
                new NewDjinnRequest("Fever", Element.MARS, Game.GOLDEN_SUN, "Vale", "Causa estado de fiebre", 25),
                new NewDjinnRequest("Corona", Element.MARS, Game.GOLDEN_SUN, "Vale", "Aumenta el ataque", 30),
                new NewDjinnRequest("Gust", Element.JUPITER, Game.GOLDEN_SUN, "Vale", "Ataque de viento", 20),
                new NewDjinnRequest("Breeze", Element.JUPITER, Game.GOLDEN_SUN, "Vale", "Aumenta la agilidad", 25),
                new NewDjinnRequest("Fizz", Element.MERCURY, Game.GOLDEN_SUN, "Vale", "Ataque de agua", 30),
                new NewDjinnRequest("Sleet", Element.MERCURY, Game.GOLDEN_SUN, "Vale", "Cura estados alterados", 20),
                new NewDjinnRequest("Mist", Element.MERCURY, Game.THE_LOST_AGE, "Shrine of the Sea God", "Protege con niebla", 35),
                new NewDjinnRequest("Spark", Element.JUPITER, Game.THE_LOST_AGE, "Kolima Forest", "Ataque eléctrico", 40),
                new NewDjinnRequest("Echo", Element.VENUS, Game.DARK_DAWN, "Tundaria Tower", "Repite el último efecto", 45),
                new NewDjinnRequest("Blitz", Element.JUPITER, Game.DARK_DAWN, "Belinsk", "Ataque rápido de rayo", 50));

        djinn.forEach(service::create);
    }
}
