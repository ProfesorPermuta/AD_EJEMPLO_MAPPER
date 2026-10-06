package com.permuta.ejemplo_mapper.djinn.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Djinn {
    private Long id;
    private String name;
    private Element element;
    private Game game;
    private String location;
    private String effect;
    private int summonPower;
    private DjinnState state;
    private LocalDateTime createdAt;
}
