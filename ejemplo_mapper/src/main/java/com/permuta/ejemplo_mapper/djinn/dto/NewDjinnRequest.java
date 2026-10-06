package com.permuta.ejemplo_mapper.djinn.dto;

import com.permuta.ejemplo_mapper.djinn.model.Element;
import com.permuta.ejemplo_mapper.djinn.model.Game;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NewDjinnRequest(
        @NotBlank String name,
        @NotNull Element element,
        @NotNull Game game,
        @NotBlank String location,
        @NotBlank String effect,
        @Min(0) int summonPower) {
}
