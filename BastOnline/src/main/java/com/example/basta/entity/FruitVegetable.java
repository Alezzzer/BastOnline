package com.example.basta.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum FruitVegetable {
	
	FRUIT("fruit"),
    VEGETABLE("vegetable");

    private final String value;

    FruitVegetable(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static FruitVegetable fromValue(String value) {
        for (FruitVegetable fruitVegetable : values()) {
            if (fruitVegetable.value.equalsIgnoreCase(value)) {
                return fruitVegetable;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + value);
    }
}
